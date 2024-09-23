import React from 'react'

import { UserButton, SignedIn, SignedOut, SignInButton } from '@clerk/nextjs'
import Logo from '@/components/Logo'
import ThemeSwitcher from '@/components/ThemeSwitcher'

function Layout({ children }) {
    return (
        <div className="flex flex-col min-h-screen max-h-screen min-w-full bg-background">
            <nav className="w-full border-b flex items-center p-4 justify-between">
                <Logo />
                <div className="flex gap-4 items-center">
                    <ThemeSwitcher />
                    <SignedOut>
                        <SignInButton />
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </nav>
            <main>
                {children}
            </main>
        </div>
    )
}

export default Layout