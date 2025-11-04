import { useEffect } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';

export function GlobalSearchTrigger() {
  const { open, setOpen } = useSidebar();
  
  // Keyboard shortcut: Cmd/Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(!open);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, setOpen]);
  
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setOpen(!open)}
      className="gap-2"
    >
      <Search className="w-4 h-4" />
      <span className="hidden lg:inline">Search</span>
      <kbd className="hidden lg:inline pointer-events-none h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium opacity-100">
        <span className="text-xs">⌘</span>K
      </kbd>
    </Button>
  );
}
