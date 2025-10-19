'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { handleGoogleCallback } from '@/app/actions/auth';
import { toast } from 'sonner';

function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    const error = searchParams.get('error');

    if (error) {
      // Handle OAuth error
      console.error('OAuth error:', error);
      
      // Show error message to user
      if (error === 'oauth_failed') {
        toast.error('Google OAuth authentication failed', {
          description: 'Please try again or use email/password to sign in.',
        });
      } else if (error === 'oauth_error') {
        toast.error('Authentication error', {
          description: 'An error occurred during authentication. Please try again.',
        });
      }
      
      // Redirect to sign-in page
      router.push('/sign-in');
      return;
    }

    if (token) {
      // Handle successful OAuth callback
      handleGoogleCallback(token).then((result) => {
        if (result.success) {
          toast.success('Welcome!', {
            description: 'You have successfully signed in with Google.',
          });
          // Redirect to loading page
          router.push('/loading');
        } else {
          toast.error('Authentication failed', {
            description: result.message || 'Failed to complete Google authentication.',
          });
          router.push('/sign-in');
        }
      }).catch((error) => {
        console.error('Error handling Google callback:', error);
        toast.error('Authentication failed', {
          description: 'An unexpected error occurred. Please try again.',
        });
        router.push('/sign-in');
      });
    } else {
      // No token received, redirect to sign-in
      toast.error('Authentication failed', {
        description: 'No authentication token received. Please try again.',
      });
      router.push('/sign-in');
    }
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex bg-black items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Completing authentication...</p>
      </div>
    </div>
  );
}

export default function CallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p>Loading...</p>
      </div>
    }>
      <CallbackContent />
    </Suspense>
  );
}
