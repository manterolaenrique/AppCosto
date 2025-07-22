"use client";
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Información del desarrollador */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold mb-3 text-blue-300">Manterola Enrique</h3>
            <p className="text-gray-300 mb-2">Desarrollador Full Stack</p>
            <p className="text-sm text-gray-400">
              Especializado en React, Next.js y aplicaciones web modernas
            </p>
          </div>

          {/* Tecnologías del proyecto */}
          <div className="text-center">
            <h3 className="text-lg font-bold mb-3 text-blue-300">Tecnologías</h3>
            <div className="flex flex-wrap justify-center gap-2">
              <span className="bg-blue-600 px-2 py-1 rounded text-xs">Next.js</span>
              <span className="bg-blue-600 px-2 py-1 rounded text-xs">React</span>
              <span className="bg-blue-600 px-2 py-1 rounded text-xs">TypeScript</span>
              <span className="bg-blue-600 px-2 py-1 rounded text-xs">Tailwind CSS</span>
            </div>
          </div>

          {/* Contacto */}
          <div className="text-center md:text-right">
            <h3 className="text-lg font-bold mb-3 text-blue-300">Contacto</h3>
            <div className="space-y-2">
              <a 
                href="mailto:manterolaenrique@hotmail.com"
                className="block text-gray-300 hover:text-blue-300 transition-colors"
              >
                📧 manterolaenrique@hotmail.com
              </a>
              <a 
                href="https://www.linkedin.com/in/enrique-manterola-8bb572189/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-gray-300 hover:text-blue-300 transition-colors"
              >
                💼 LinkedIn
              </a>
              <a 
                href="https://github.com/manterolaenrique" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-gray-300 hover:text-blue-300 transition-colors"
              >
                🐙 GitHub
              </a>
            </div>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-gray-700 mt-6 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} Manterola Enrique. Todos los derechos reservados.
            </p>
            <p className="text-gray-400 text-sm text-center md:text-right mt-2 md:mt-0">
              Proyecto desarrollado con ❤️ para portfolio personal
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 