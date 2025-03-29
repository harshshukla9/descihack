// src/components/Navbar.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X, Github, UserPlus, FileDown, Settings } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Processing', href: '/processing' },
  { name: 'Documentation', href: '/docs' },
  { name: 'About', href: '/about' }
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        scrolled 
          ? "bg-white/90 backdrop-blur-sm shadow-md py-2" 
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-white font-bold text-xl">
              N
            </div>
            <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-blue-500 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300" />
          </motion.div>
          <span className="ml-2 font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            NIH Dataset
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <NavLink key={link.name} href={link.href} name={link.name} />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            className="border-purple-200 text-purple-600 hover:bg-purple-50"
          >
            <Github className="h-4 w-4 mr-2" />
            GitHub
          </Button>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="sm"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Login
            </Button>
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="block md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="h-6 w-6 text-gray-700" />
          ) : (
            <Menu className="h-6 w-6 text-gray-700" />
          )}
        </motion.button>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-lg mt-0 overflow-hidden z-50"
            >
              <div className="flex flex-col py-4 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="px-6 py-2 hover:bg-purple-50 transition-colors duration-200 flex items-center"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                
                <div className="border-t border-gray-100 my-2 pt-2 px-4 space-y-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="w-full justify-start border-purple-200 text-purple-600 hover:bg-purple-50"
                    onClick={() => setIsOpen(false)}
                  >
                    <Github className="h-4 w-4 mr-2" />
                    GitHub
                  </Button>
                  
                  <Button
                    size="sm"
                    className="w-full justify-start bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    onClick={() => setIsOpen(false)}
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

// Individual nav link component with hover effect
function NavLink({ href, name }: { href: string; name: string }) {
  return (
    <Link 
      href={href}
      className="relative px-3 py-2 rounded-md text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium"
    >
      {name}
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 scale-x-0 transition-transform duration-200 origin-left hover:scale-x-100" />
    </Link>
  )
}