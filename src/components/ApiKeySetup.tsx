import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, Key, ExternalLink, Copy } from 'lucide-react';
import { useState } from 'react';

interface ApiKeySetupProps {
  onContinueAnyway: () => void;
}

export const ApiKeySetup = ({ onContinueAnyway }: ApiKeySetupProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEnvVar = () => {
    navigator.clipboard.writeText('VITE_OPENAI_API_KEY=your_api_key_here');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        {/* Header */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center"
          >
            <Key size={32} className="text-white" />
          </motion.div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            🚨 API Key Required for Maximum Sass!
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            To unlock the full AI-powered roasting experience, you'll need an OpenAI API key. 
            Don't worry, it's quick and easy to set up!
          </p>
        </div>

        {/* Setup Instructions */}
        <Card className="p-8 bg-gradient-to-br from-card to-card/80 border-primary/20">
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <AlertCircle className="text-yellow-500" size={24} />
              <h2 className="text-2xl font-bold text-foreground">Quick Setup Guide</h2>
            </div>

            <div className="grid gap-6">
              {/* Step 1 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                  1
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">Get your OpenAI API Key</h3>
                  <p className="text-muted-foreground">
                    Visit the OpenAI platform and create an API key (it's free to start!)
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open('https://platform.openai.com/api-keys', '_blank')}
                    className="mt-2"
                  >
                    <ExternalLink size={16} className="mr-2" />
                    Get API Key
                  </Button>
                </div>
              </motion.div>

              {/* Step 2 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                  2
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">Create a .env.local file</h3>
                  <p className="text-muted-foreground">
                    In your project root, create a file called <code className="bg-muted px-2 py-1 rounded">.env.local</code>
                  </p>
                  <div className="bg-muted/50 p-3 rounded-lg border border-border">
                    <div className="flex items-center justify-between">
                      <code className="text-sm">VITE_OPENAI_API_KEY=your_api_key_here</code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleCopyEnvVar}
                        className="ml-2"
                      >
                        {copied ? (
                          <span className="text-green-500">Copied!</span>
                        ) : (
                          <Copy size={16} />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Step 3 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                  3
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">Restart your dev server</h3>
                  <p className="text-muted-foreground">
                    Run <code className="bg-muted px-2 py-1 rounded">npm run dev</code> again to reload with your API key
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </Card>

        {/* Alternative Options */}
        <Card className="p-6 bg-gradient-to-br from-card/50 to-card/30 border-border/50">
          <div className="text-center space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Want to test without an API key?</h3>
            <p className="text-muted-foreground">
              You can still explore the app with placeholder responses, but you'll miss out on the real AI sass! 😢
            </p>
            <Button
              variant="outline"
              onClick={onContinueAnyway}
              className="mt-4"
            >
              Continue with Demo Mode
            </Button>
          </div>
        </Card>

        {/* Security Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-center text-sm text-muted-foreground/80 space-y-2"
        >
          <p>🔒 Your API key is only used locally and never stored on our servers</p>
          <p>💡 This is a demo app - in production, API calls should go through your backend</p>
        </motion.div>
      </motion.div>
    </div>
  );
};