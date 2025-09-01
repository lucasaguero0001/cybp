import React from 'react';
import { Mail, Phone, MapPin, Heart, Clock, Truck, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <Heart className="h-8 w-8 text-white" />
              <h3 className="text-2xl font-bold">CyberPétalos</h3>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Tu tienda de flores favorita. Llevamos belleza natural a tu hogar con flores frescas y floreros elegantes.
            </p>
            
            {/* Service Features */}
            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <Truck className="h-5 w-5 text-pink-400 mr-3" />
                <span className="text-sm">Envío gratuito en compras mayores a $50</span>
              </div>
              <div className="flex items-center text-gray-300">
                <ShieldCheck className="h-5 w-5 text-pink-400 mr-3" />
                <span className="text-sm">Garantía de frescura por 5 días</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Clock className="h-5 w-5 text-pink-400 mr-3" />
                <span className="text-sm">Entrega el mismo día antes de 12:00 PM</span>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Contacto</h4>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-pink-400 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">
                    Av. de las Flores 1234<br />
                    Ciudad Jardín, Provincia<br />
                    CP 1425
                  </p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-pink-400 mr-3 flex-shrink-0" />
                <div>
                  <a 
                    href="tel:+541145678900" 
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    +54 11 4567-8900
                  </a>
                  <p className="text-sm text-gray-400">Lun-Vie: 9:00-18:00</p>
                </div>
              </div>

              <div className="flex items-center">
                <Mail className="h-5 w-5 text-pink-400 mr-3 flex-shrink-0" />
                <a 
                  href="mailto:info@cyberpetalos.com" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  info@cyberpetalos.com
                </a>
              </div>
            </div>
          </div>

          {/* Policies and Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Horarios de Atención</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-300">Lunes - Viernes</span>
                <span className="text-gray-400">9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-300">Sábados</span>
                <span className="text-gray-400">9:00 AM - 2:00 PM</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-300">Domingos</span>
                <span className="text-red-400">Cerrado</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-300">Plataforma Web</span>
                <span className="text-green-400">24/7 Disponible</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-800 rounded-lg">
              <h5 className="font-semibold text-white mb-2">Política de Devoluciones</h5>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Devoluciones dentro de 7 días</li>
                <li>• Flores garantizadas por 5 días</li>
                <li>• Floreros con garantía de 30 días</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2025 CyberPétalos. Todos los derechos reservados.
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <span>Hecho con</span>
            <Heart className="h-4 w-4 text-pink-400" />
            <span>para amantes de las flores</span>
          </div>
        </div>
      </div>
    </footer>
  );
};