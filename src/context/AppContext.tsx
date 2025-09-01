import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Types
export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'client';
  bankData?: {
    cardNumber: string;
    cardName: string;
    expiryDate: string;
    cvv: string;
  };
  address?: string;
  purchaseHistory: Purchase[];
}

export interface Product {
  id: string;
  name: string;
  category: 'flores' | 'floreros';
  price: number;
  stock: number;
  image: string;
  description: string;
  reorderPoint: number;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Purchase {
  id: string;
  userId: string;
  items: Array<{ productId: string; quantity: number; price: number; name: string; }>;
  total: number;
  paymentMethod: string;
  address: string;
  date: string;
  status: 'completed' | 'pending' | 'cancelled';
}

interface AppState {
  currentUser: User | null;
  isLoggedIn: boolean;
  users: User[];
  products: Product[];
  cart: CartItem[];
  purchases: Purchase[];
  loginAttempts: number;
  isLoading: boolean;
}

type AppAction =
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'REGISTER_USER'; payload: User }
  | { type: 'UPDATE_USER'; payload: { userId: string; data: Partial<User> } }
  | { type: 'DELETE_USER'; payload: string }
  | { type: 'ADD_TO_CART'; payload: { productId: string; quantity: number } }
  | { type: 'UPDATE_CART_ITEM'; payload: { productId: string; quantity: number } }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'CLEAR_CART' }
  | { type: 'UPDATE_PRODUCT'; payload: { productId: string; data: Partial<Product> } }
  | { type: 'ADD_PRODUCT'; payload: Product }
  | { type: 'DELETE_PRODUCT'; payload: string }
  | { type: 'COMPLETE_PURCHASE'; payload: Purchase }
  | { type: 'INCREMENT_LOGIN_ATTEMPTS' }
  | { type: 'RESET_LOGIN_ATTEMPTS' }
  | { type: 'SET_LOADING'; payload: boolean };

// Initial data
const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Rosas Rojas Premium',
    category: 'flores',
    price: 25.99,
    stock: 50,
    image: 'https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Hermosas rosas rojas frescas, perfectas para expresar amor y pasión.',
    reorderPoint: 10
  },
  {
    id: '2',
    name: 'Tulipanes Amarillos',
    category: 'flores',
    price: 18.50,
    stock: 35,
    image: 'https://images.pexels.com/photos/159406/tulips-netherlands-flowers-bloom-159406.jpeg',
    description: 'Tulipanes frescos que alegran cualquier ambiente con su color vibrante.',
    reorderPoint: 8
  },
  {
    id: '3',
    name: 'Florero Elegante Cristal',
    category: 'floreros',
    price: 45.00,
    stock: 20,
    image: 'https://images.pexels.com/photos/33361759/pexels-photo-33361759.jpeg',
    description: 'Florero de cristal transparente con diseño moderno y elegante.',
    reorderPoint: 5
  },
  {
    id: '4',
    name: 'Girasoles Brillantes',
    category: 'flores',
    price: 22.75,
    stock: 25,
    image: 'https://images.pexels.com/photos/1169084/pexels-photo-1169084.jpeg',
    description: 'Girasoles radiantes que traen la energía del sol a tu hogar.',
    reorderPoint: 6
  },
  {
    id: '5',
    name: 'Florero Rústico Cerámica',
    category: 'floreros',
    price: 32.99,
    stock: 15,
    image: 'https://images.pexels.com/photos/5737459/pexels-photo-5737459.jpeg',
    description: 'Florero artesanal de cerámica con acabado rústico único.',
    reorderPoint: 3
  },
  {
    id: '6',
    name: 'Orquídeas Blancas',
    category: 'flores',
    price: 38.99,
    stock: 12,
    image: 'https://images.pexels.com/photos/1076233/pexels-photo-1076233.jpeg',
    description: 'Orquídeas blancas exóticas de gran belleza y elegancia.',
    reorderPoint: 4
  }
];

const initialUsers: User[] = [
  {
    id: 'admin-1',
    username: 'admin',
    email: 'admin@cyberpetalos.com',
    password: 'admin123',
    role: 'admin',
    purchaseHistory: []
  },
  {
    id: 'user-1',
    username: 'cliente1',
    email: 'cliente@gmail.com',
    password: 'cliente123',
    role: 'client',
    purchaseHistory: []
  }
];

const initialState: AppState = {
  currentUser: null,
  isLoggedIn: false,
  users: initialUsers,
  products: initialProducts,
  cart: [],
  purchases: [],
  loginAttempts: 0,
  isLoading: false,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        currentUser: action.payload,
        isLoggedIn: true,
        loginAttempts: 0,
      };

    case 'LOGOUT':
      return {
        ...state,
        currentUser: null,
        isLoggedIn: false,
        cart: [],
      };

    case 'REGISTER_USER':
      return {
        ...state,
        users: [...state.users, action.payload],
      };

    case 'UPDATE_USER':
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.payload.userId
            ? { ...user, ...action.payload.data }
            : user
        ),
        currentUser: state.currentUser?.id === action.payload.userId
          ? { ...state.currentUser, ...action.payload.data }
          : state.currentUser,
      };

    case 'DELETE_USER':
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload),
      };

    case 'ADD_TO_CART':
      const existingItem = state.cart.find(item => item.productId === action.payload.productId);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.productId === action.payload.productId
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };

    case 'UPDATE_CART_ITEM':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.productId === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.productId !== action.payload),
      };

    case 'CLEAR_CART':
      return {
        ...state,
        cart: [],
      };

    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.payload.productId
            ? { ...product, ...action.payload.data }
            : product
        ),
      };

    case 'ADD_PRODUCT':
      return {
        ...state,
        products: [...state.products, action.payload],
      };

    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter(product => product.id !== action.payload),
      };

    case 'COMPLETE_PURCHASE':
      // Update product stock
      const updatedProducts = state.products.map(product => {
        const purchasedItem = action.payload.items.find(item => item.productId === product.id);
        if (purchasedItem) {
          return { ...product, stock: product.stock - purchasedItem.quantity };
        }
        return product;
      });

      // Update user purchase history
      const updatedUsers = state.users.map(user =>
        user.id === action.payload.userId
          ? { ...user, purchaseHistory: [...user.purchaseHistory, action.payload] }
          : user
      );

      return {
        ...state,
        products: updatedProducts,
        users: updatedUsers,
        currentUser: state.currentUser?.id === action.payload.userId
          ? { ...state.currentUser, purchaseHistory: [...state.currentUser.purchaseHistory, action.payload] }
          : state.currentUser,
        purchases: [...state.purchases, action.payload],
        cart: [],
      };

    case 'INCREMENT_LOGIN_ATTEMPTS':
      return {
        ...state,
        loginAttempts: state.loginAttempts + 1,
      };

    case 'RESET_LOGIN_ATTEMPTS':
      return {
        ...state,
        loginAttempts: 0,
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };

    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};