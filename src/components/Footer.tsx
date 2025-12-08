import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Instagram } from "lucide-react";

export const Footer = () => {
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Newsletter logic would go here
  };

  return (
    <footer className="bg-[hsl(var(--alarm))] text-[hsl(var(--alarm-foreground))] py-16 mt-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo & Newsletter */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold font-poppins">+Creator</h3>
            <p className="text-sm opacity-80">Jovens idealistas construindo um futuro com propósito.</p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <Input type="email" placeholder="Seu e-mail" className="bg-white/10 border-white/20 text-white placeholder:text-white/50" />
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Inscrever-se
              </Button>
            </form>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-lg font-bold mb-4 font-sans">Navegação</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="opacity-80 hover:opacity-100 hover:text-primary transition-all">Home</Link>
              </li>
              <li>
                <Link to="/alarme" className="opacity-80 hover:opacity-100 hover:text-primary transition-all">O Problema</Link>
              </li>
              <li>
                <Link to="/quem-somos" className="opacity-80 hover:opacity-100 hover:text-primary transition-all">Quem Somos</Link>
              </li>
              <li>
                {/* Link para /projetos removido enquanto a área da Influ.IA não está pronta */}
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-bold mb-4 font-sans">Legal</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="opacity-80 hover:opacity-100 hover:text-primary transition-all">Política de Privacidade</a>
              </li>
              <li>
                <a href="#" className="opacity-80 hover:opacity-100 hover:text-primary transition-all">Termos de Uso</a>
              </li>
              <li>
                <a href="#" className="opacity-80 hover:opacity-100 hover:text-primary transition-all">Transparência</a>
              </li>
              <li>
                <a href="#" className="opacity-80 hover:opacity-100 hover:text-primary transition-all">Contato</a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-lg font-bold mb-4 font-sans">Social</h4>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/maiscreator/"
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-white/10 rounded-full hover:bg-primary hover:scale-110 transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
            <p className="mt-6 text-sm opacity-60">Siga no Instagram</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm opacity-60">© 2025 Movimento <span className="font-poppins">+Creator</span>. Todos os direitos reservados.</p>
            <p className="text-sm opacity-60">Feito com ❤️ por jovens inconformados</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
