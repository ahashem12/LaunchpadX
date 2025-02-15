import { FC } from "react";
import { Users } from "lucide-react";
import Image from "next/image";

interface TeamMemberProps {
  name: string;
  role: string;
  //   description: string;
  linkedinUrl: string;
}

const TeamMember: FC<TeamMemberProps> = ({
  name,
  role,
  //   description,
  linkedinUrl,
}) => {
  return (
    <div className="text-center">
      <div
        className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full mx-auto mb-4 
        flex items-center justify-center"
      >
        <Users className="w-8 h-8 text-blue-600" />
      </div>
      <div className="flex items-center justify-center gap-2 mb-1">
        <h3 className="font-semibold text-gray-900">{name}</h3>
        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center hover:opacity-80 transition-opacity"
        >
          <Image
            src="/linkedin-icon.svg"
            alt="LinkedIn"
            width={16}
            height={16}
            className="w-4 h-4"
          />
        </a>
      </div>
      <p className="text-blue-600 text-sm mb-2">{role}</p>
      {/* <p className="text-gray-600 text-sm">{description}</p> */}
    </div>
  );
};

const Team: FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-xl mx-4 p-8 mb-8">
      <div className="flex items-center gap-2 mb-6">
        <Users className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">Meet Our Team</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        <TeamMember
          name="Ahmad Hashem"
          role="Lead Developer"
          //   description="PhD in Machine Learning with 10+ years of experience in AI development"
          linkedinUrl="https://www.linkedin.com/in/ahmad-hashem/"
        />
        <TeamMember
          name="Tala Dabbagh"
          role="Front End Developer"
          //   description="Former McKinsey consultant with expertise in digital transformation"
          linkedinUrl="https://www.linkedin.com/in/tala-dabbagh-ta14la09/"
        />
        <TeamMember
          name="Mohammad Imad"
          role="Backend Developer"
          //   description="15+ years experience in building AI-powered enterprise solutions"
          linkedinUrl="https://www.linkedin.com/in/mohammed-imad-2a04a2162/"
        />
      </div>
    </div>
  );
};

export default Team;
