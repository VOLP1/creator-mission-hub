import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Quiz = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4 py-16 pt-32">
        <div className="flex flex-col items-center justify-center min-h-[70vh]">
          <div className="w-full max-w-2xl">
            <div className="space-y-6 pb-8">
              <div className="bg-orange-950/40 border border-orange-800 rounded-lg p-8 text-center shadow-xl backdrop-blur-sm">
                <h3 className="text-3xl font-bold text-orange-400 mb-4">
                  🚧 Em Construção
                </h3>
                <p className="text-gray-300 text-lg mb-6">
                  Esta funcionalidade ainda está sendo desenvolvida. 
                  Em breve você poderá descobrir seu perfil digital e 
                  entender como você se relaciona com a tecnologia e as redes sociais.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                  <Link to="/">
                    <Button variant="default" size="lg" className="w-full sm:w-auto">
                      Voltar para Home
                    </Button>
                  </Link>
                  <Link to="/calculadora">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto border-orange-600 text-orange-400 hover:bg-orange-950/60">
                      Ver Calculadora
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="grid gap-6 pt-6">
                <div className="text-center space-y-4 bg-gray-900/50 rounded-lg p-6 border border-gray-800">
                  <h4 className="font-semibold text-xl text-gray-200">O que você poderá fazer em breve:</h4>
                  <ul className="text-gray-400 space-y-3 text-left max-w-md mx-auto">
                    <li className="flex items-start gap-3">
                      <span className="text-orange-500 text-xl">✓</span>
                      <span>Descobrir seu perfil de relacionamento com as redes sociais</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-orange-500 text-xl">✓</span>
                      <span>Receber insights personalizados sobre seus hábitos digitais</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-orange-500 text-xl">✓</span>
                      <span>Compartilhar seus resultados com amigos</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-orange-500 text-xl">✓</span>
                      <span>Obter recomendações práticas para melhorar sua relação com a tecnologia</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
