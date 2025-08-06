import { Button } from "@/components/ui/button";
import { Leaf, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const Header = () => {
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => navigate('/')}
        >
          <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
            <Leaf className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">Givetastic</span>
        </div>

        <div className="flex items-center gap-6">
          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="hover:text-primary"
            >
              Home
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => navigate('/about')}
              className="hover:text-primary"
            >
              About
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => scrollToSection('faq')}
              className="hover:text-primary"
            >
              FAQ
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => scrollToSection('contact')}
              className="hover:text-primary"
            >
              Contact
            </Button>
            <Button 
              variant="default" 
              onClick={() => scrollToSection('contact')}
            >
              Join as Coach
            </Button>
          </nav>
          
          {/* Auth Section */}
          <div className="flex items-center">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    {profile?.is_admin ? 'Admin' : 'User'}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={signOut}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate('/auth')}
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;