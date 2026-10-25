import { AuthForm } from '@/components/auth/auth-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default async function LoginPage() {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="bg-primary mx-auto h-px w-12" aria-hidden />
        <Card className="shadow-none">
          <CardHeader className="space-y-1">
            <CardTitle className="text-center text-2xl font-light tracking-[-0.03em]">Login</CardTitle>
            <CardDescription className="text-center font-light">Login to your account to continue</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <AuthForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
