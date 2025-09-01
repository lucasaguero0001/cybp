import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, MessageCircle, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-pink-600 via-rose-500 to-pink-600 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <Heart className="h-8 w-8 text-white" />
              <h3 className="text-2xl font-bold">CyberPétalos</h3>
            </div>
            <p className="text-pink-100 mb-4 leading-relaxed">
              Tu tienda de flores favorita. Llevamos belleza natural a tu hogar con flores frescas y floreros elegantes desde 2020.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com/cyberpetalos"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-full transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com/cyberpetalos"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-full transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/cyberpetalos"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-full transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contacto</h4>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-white mr-3 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-pink-100">
                    Av. de las Flores 1234<br />
                    Ciudad Jardín, Provincia<br />
                    CP 1425
                  </p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-white mr-3 flex-shrink-0" />
                <div>
                  <a 
                    href="tel:+541145678900" 
                    className="text-pink-100 hover:text-white transition-colors"
                  >
                    +54 11 4567-8900
                  </a>
                  <p className="text-sm text-pink-200">Lun-Vie: 9:00-18:00</p>
                </div>
              </div>

              <div className="flex items-center">
                <Mail className="h-5 w-5 text-white mr-3 flex-shrink-0" />
                <a 
                  href="mailto:info@cyberpetalos.com" 
                  className="text-pink-100 hover:text-white transition-colors"
                >
                  info@cyberpetalos.com
                </a>
              </div>

              <div className="flex items-center">
                <MessageCircle className="h-5 w-5 text-white mr-3 flex-shrink-0" />
                <a 
                  href="https://wa.me/541145678900" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-100 hover:text-white transition-colors"
                >
                  WhatsApp: +54 11 4567-8900
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Enlaces Rápidos</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-pink-100 hover:text-white transition-colors">
                  Catálogo de Flores
                </a>
              </li>
              <li>
                <a href="#" className="text-pink-100 hover:text-white transition-colors">
                  Floreros
                </a>
              </li>
              <li>
                <a href="#" className="text-pink-100 hover:text-white transition-colors">
                  Ofertas Especiales
                </a>
              </li>
              <li>
                <a href="#" className="text-pink-100 hover:text-white transition-colors">
                  Cuidado de Flores
                </a>
              </li>
              <li>
                <a href="#" className="text-pink-100 hover:text-white transition-colors">
                  Preguntas Frecuentes
                </a>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Políticas</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-pink-100 hover:text-white transition-colors">
                  Políticas de Devolución
                </a>
              </li>
              <li>
                <a href="#" className="text-pink-100 hover:text-white transition-colors">
                  Términos y Condiciones
                </a>
              </li>
              <li>
                <a href="#" className="text-pink-100 hover:text-white transition-colors">
                  Política de Privacidad
                </a>
              </li>
              <li>
                <a href="#" className="text-pink-100 hover:text-white transition-colors">
                  Política de Envíos
                </a>
              </li>
              <li>
                <a href="#" className="text-pink-100 hover:text-white transition-colors">
                  Garantía de Frescura
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Policies Details */}
        <div className="border-t border-pink-400 border-opacity-30 mt-12 pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Return Policy */}
            <div className="bg-white bg-opacity-10 rounded-lg p-6">
              <h5 className="text-lg font-semibold text-white mb-4">Política de Devoluciones</h5>
              <ul className="text-pink-100 text-sm space-y-2">
                <li>• Devoluciones aceptadas dentro de 7 días calendario</li>
                <li>• Flores frescas garantizadas por 5 días desde la entrega</li>
                <li>• Floreros con garantía de 30 días por defectos de fabricación</li>
                <li>• Productos deben estar en perfecto estado para devolución</li>
                <li>• Reembolso completo o cambio por producto equivalente</li>
                <li>• Gastos de envío de devolución a cargo del cliente</li>
              </ul>
            </div>

            {/* Terms and Conditions */}
            <div className="bg-white bg-opacity-10 rounded-lg p-6">
              <h5 className="text-lg font-semibold text-white mb-4">Términos y Condiciones</h5>
              <ul className="text-pink-100 text-sm space-y-2">
                <li>• Precios sujetos a cambios sin previo aviso</li>
                <li>• Disponibilidad de productos según stock</li>
                <li>• Entrega en horarios laborales (9:00 - 18:00)</li>
                <li>• Pago seguro con encriptación SSL</li>
                <li>• Datos personales protegidos según ley de privacidad</li>
                <li>• Uso del sitio implica aceptación de términos</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-pink-400 border-opacity-30 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-pink-200 text-sm mb-4 md:mb-0">
            © 2025 CyberPétalos. Todos los derechos reservados.
          </div>
          <div className="flex items-center space-x-6 text-sm text-pink-200">
            <span>Hecho con</span>
            <Heart className="h-4 w-4 text-white" />
            <span>para amantes de las flores</span>
          </div>
        </div>
      </div>
    </footer>
  );
};