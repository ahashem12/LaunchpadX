import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wallet } from "lucide-react";

interface WalletAddressSectionProps {
  walletAddress: string | null;
  onWalletAddressChange: (address: string) => void;
}

export function WalletAddressSection({ walletAddress, onWalletAddressChange }: WalletAddressSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <Wallet className="w-5 h-5" />
          Wallet Address
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <Label htmlFor="wallet-address">Connect your wallet</Label>
          <Input
            id="wallet-address"
            placeholder="0x..."
            value={walletAddress || ""}
            onChange={(e) => onWalletAddressChange(e.target.value)}
            className="font-mono"
          />
          <p className="text-xs text-muted-foreground">
            Your public wallet address for rewards and transactions.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
