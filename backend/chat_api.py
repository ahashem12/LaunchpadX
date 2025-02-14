import re
from flask import Flask, request, Response
from flask_cors import CORS
from dotenv import load_dotenv
import os
import openai
import json

# Load environment variables
load_dotenv()

# Setup OpenAI
api_key = os.getenv("OPENAI_API_KEY")
if api_key is None:
    print("Error: API key not found")
    exit(1)

openai.api_key = api_key

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Store sessions
sessions = {}

def check_missing_info(session):
    missing_info = []
    if 'business_name' not in session or session['business_name'] == '':
        missing_info.append("business name")
    if 'employees_number' not in session or session['employees_number'] == '':
        missing_info.append("number of employees")
    if 'phone_number' not in session or session['phone_number'] == '':
        missing_info.append("phone number")
    return missing_info

@app.route('/message', methods=['POST'])
def handle_message():
    try:
        data = request.get_json()
        user_id = data.get('user_id', 'default')
        user_message = data.get('message', '')
        
        if not user_message:
            return Response("Please provide a message", mimetype='text/plain')
        
        if user_id not in sessions:
            sessions[user_id] = {}
        
        session = sessions[user_id]
        
        messages = [
            {"role": "system", "content": "You are a business consultant helping clients gather necessary information. Your goal is to collect the business name, number of employees, and phone number. Respond with the information in a valid JSON format, with keys 'business_name', 'number_of_employees', and 'phone_number'. If any information is missing, leave it blank, but ensure the response is still valid JSON."},
            {"role": "user", "content": user_message}
        ]
        
        response = openai.chat.completions.create(
            model="gpt-4o-mini",
            messages=messages
        )
        
        bot_response = response.choices[0].message.content
        
        # Check if the response is empty
        if not bot_response or bot_response.strip() == "":
            return Response("I didn't understand that. Could you please try again?", mimetype='text/plain')
        
        # Clean the response
        cleaned_response = re.sub(r'```json\n|```', '', bot_response).strip()
        
        # Parse JSON response
        try:
            bot_data = json.loads(cleaned_response)
        except json.JSONDecodeError as e:
            return Response("I didn't understand that. Could you please try again?", mimetype='text/plain')
        
        # Update session with new data
        if bot_data.get('business_name'):
            session['business_name'] = bot_data['business_name']
        if bot_data.get('number_of_employees'):
            session['employees_number'] = bot_data['number_of_employees']
        if bot_data.get('phone_number'):
            session['phone_number'] = bot_data['phone_number']
        
        # Check for missing information
        missing_info = check_missing_info(session)
        
        if not missing_info:
            return Response(
                "Thank you! I have all the information I need. Is there anything else I can help you with?",
                mimetype='text/plain'
            )
        else:
            return Response(
                f"I still need the following details: {', '.join(missing_info)}. Please provide them one by one.",
                mimetype='text/plain'
            )

    except Exception as e:
        return Response("I encountered an error. Could you please try again?", mimetype='text/plain')

# Run the Flask app
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)