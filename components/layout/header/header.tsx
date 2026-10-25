'use client';

import { useState, useEffect } from 'react';

import Logo from './logo';
import Navbar from './navbar';
import NavbarMobile from './navbar-mobile';

import { cn } from '@/lib/utils';
import { UserMenu } from '../nav/user-menu';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { myCookies, readCookieFromDocument } from '@/utils/cookies';
import { usePathname } from 'next/navigation';

function Header() {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const onDark = usesDarkHero(pathname) && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  // Check authentication on client side only to prevent hydration mismatch
  useEffect(() => {
    setTimeout(() => {
      const authToken = readCookieFromDocument(myCookies.auth);
      setIsAuthenticated(!!authToken);
      setIsMounted(true);
    }, 100);
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-50 w-full">
      <header
        className={cn(
          'relative z-60 mx-auto flex w-full items-center justify-between border-b px-6 py-4 backdrop-blur-md transition-colors duration-300',
          onDark ? 'border-white/10 bg-foreground/90 text-white' : 'border-border bg-background/90',
        )}
      >
        <Logo width={80} height={40} className={onDark ? 'brightness-0 invert' : ''} />

        <div className="absolute left-1/2 -translate-x-1/2">
          <Navbar onDark={onDark} />
        </div>

        <div>
          <div
            className={cn(
              'flex items-center gap-2 lg:ms-8 lg:border-s lg:ps-8',
              onDark ? 'lg:border-white/15' : 'lg:border-border',
            )}
          >
            {isMounted && isAuthenticated ? (
              <UserMenu />
            ) : (
              <Button
                asChild
                className={cn(
                  'h-10 px-5 text-[11px] font-medium tracking-[0.16em] uppercase',
                  onDark && 'bg-primary text-primary-foreground hover:bg-primary/90',
                )}
              >
                <Link href="/login">Sign In</Link>
              </Button>
            )}
            <NavbarMobile onDark={onDark} />
          </div>
        </div>
      </header>
    </div>
  );
}

function usesDarkHero(pathname: string) {
  if (pathname.startsWith('/equipment')) return false;
  return true;
}

export default Header;
