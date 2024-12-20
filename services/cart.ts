import { axiosInstance } from './axiosInstance';
import { ApiRoutes } from './constants';
import { CartDTO } from './dto/cart.dto';

export const getCart = async (): Promise<CartDTO> => {
  return (await axiosInstance.get<CartDTO>(ApiRoutes.CART)).data;
};

export const updateItemQuantity = async (itemId: number, quantity: number): Promise<CartDTO> => {
  return (await axiosInstance.patch<CartDTO>(ApiRoutes.CART + itemId, { quantity })).data;
};

export const removeCartItem = async (id: number): Promise<CartDTO> => {
  return (await axiosInstance.delete<CartDTO>(ApiRoutes.CART + id)).data;
}