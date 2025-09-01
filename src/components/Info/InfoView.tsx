import React from 'react';
import { Heart, Truck, ShieldCheck, Clock, MapPin, Phone, Mail, Award } from 'lucide-react';
import { Footer } from '../Layout/Footer';

export const InfoView: React.FC = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Sobre CyberPétalos
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Desde 2020, CyberPétalos ha sido tu destino de confianza para flores frescas y floreros elegantes. 
            Combinamos la tradición floricultora con la innovación digital para ofrecerte la mejor experiencia.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Our Story */}
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Nuestra Historia</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  CyberPétalos nació de la pasión por las flores y el deseo de acercar la belleza natural 
                  a todos los hogares. Comenzamos como un pequeño emprendimiento familiar y hemos crecido 
                  hasta convertirnos en una plataforma digital líder en el sector floral.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Cada flor que vendemos es seleccionada cuidadosamente por nuestros expertos floristas, 
                  garantizando frescura y calidad en cada entrega. Nuestros floreros son elegidos por 
                  su diseño único y funcionalidad.
                </p>
              </div>
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/931162/pexels-photo-931162.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Floristería"
                  className="rounded-xl shadow-lg"
                />
                <div className="absolute -bottom-4 -left-4 bg-pink-500 text-white p-4 rounded-lg">
                  <Award className="h-8 w-8 mb-2" />
                  <p className="font-bold">4+ Años</p>
                  <p className="text-sm">de experiencia</p>
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-pink-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Flores Frescas</h3>
              <p className="text-gray-600 text-sm">
                Flores seleccionadas diariamente con garantía de frescura de 5 días
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Envío Rápido</h3>
              <p className="text-gray-600 text-sm">
                Entrega en el mismo día para pedidos antes de las 12:00 PM
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Garantía Total</h3>
              <p className="text-gray-600 text-sm">
                Garantía de satisfacción del 100% o devolvemos tu dinero
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">24/7 Disponible</h3>
              <p className="text-gray-600 text-sm">
                Plataforma disponible las 24 horas para realizar tus pedidos
              </p>
            </div>
          </div>

          {/* Values Section */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-xl p-8 lg:p-12 text-white mb-12">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4">Nuestros Valores</h2>
              <p className="text-lg opacity-90">
                Los principios que guían cada decisión en CyberPétalos
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Calidad</h3>
                <p className="opacity-90">
                  Solo trabajamos con las flores más frescas y los mejores proveedores
                </p>
              </div>

              <div className="text-center">
                <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Confianza</h3>
                <p className="opacity-90">
                  Transparencia y honestidad en cada transacción y comunicación
                </p>
              </div>

              <div className="text-center">
                <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Excelencia</h3>
                <p className="opacity-90">
                  Mejora continua en productos, servicio y experiencia del cliente
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contáctanos</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-pink-500 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Dirección</h3>
                    <p className="text-gray-600">
                      Av. de las Flores 1234<br />
                      Ciudad Jardín, Provincia<br />
                      CP 1425
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-pink-500 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Teléfono</h3>
                    <p className="text-gray-600">+54 11 4567-8900</p>
                    <p className="text-gray-500 text-sm">Lunes a Viernes: 9:00 - 18:00</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-pink-500 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600">info@cyberpetalos.com</p>
                    <p className="text-gray-500 text-sm">Respuesta en 24 horas</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Horarios de Atención</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="font-medium text-gray-900">Lunes - Viernes</span>
                  <span className="text-gray-600">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="font-medium text-gray-900">Sábados</span>
                  <span className="text-gray-600">9:00 AM - 2:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="font-medium text-gray-900">Domingos</span>
                  <span className="text-red-500">Cerrado</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-medium text-gray-900">Plataforma Web</span>
                  <span className="text-green-600">24/7 Disponible</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-pink-50 rounded-lg border border-pink-200">
                <p className="text-pink-800 text-sm">
                  <strong>Nota:</strong> Los pedidos realizados después de las 12:00 PM 
                  se entregan al día siguiente hábil.
                </p>
              </div>
            </div>
          </div>

          {/* Mission Statement */}
          <div className="mt-12 text-center bg-white rounded-2xl shadow-xl p-8 lg:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Nuestra Misión</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              "Transformar momentos especiales en memorias inolvidables a través de la belleza 
              natural de las flores, ofreciendo productos de calidad superior y un servicio 
              excepcional que supere las expectativas de nuestros clientes."
            </p>
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </>
  );
};