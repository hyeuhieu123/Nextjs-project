"use client";
import Image from "next/image";
import { SignIn, useUser } from "@clerk/nextjs";

import { formatCurrencyVN } from "@/shared/utils/format-money";
import { useAppDispatch, useAppSelector } from "@/store";
import { setCartLocalStorage } from "@/store/app-slice";

import { IProduct } from "@/server/_types/product-type";

import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/shared/components/ui/card";
import { Separator } from "@/shared/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { useState } from "react";
import { OrderForm } from "@/shared/components/form/order-form";
import useLocalStorage from "@/shared/hooks/use-localStorage";

const Page = () => {
  const dispatch = useAppDispatch();

  const [isCheckOut, setIsCheckOut] = useState(false);
  const [cart, setCart] = useLocalStorage<any>("carts", null);

  const { cartLocalStorage } = useAppSelector((state) => state.app);
  const { isSignedIn, user } = useUser();
  // console.log(cartLocalStorage);
  function handleRemoveProduct(cart: IProduct) {
    const updatedCart = cartLocalStorage.filter(
      (item) => item.product.id !== cart.id
    );

    dispatch(setCartLocalStorage(updatedCart));
    setCart(updatedCart);
  }
  function handleQuantityCart(
    cart: IProduct,
    action: "add" | "reduce",
    quantity?: number
  ) {
    const existingProductIndex = cartLocalStorage.findIndex(
      (item) => item.product.id === cart.id
    );

    if (existingProductIndex !== -1) {
      const updatedCart = cartLocalStorage
        .map((item, index) => {
          if (index === existingProductIndex) {
            // Nếu có số lượng từ select thì cập nhật trực tiếp
            if (quantity !== undefined) {
              return { ...item, quantity };
            }
            if (action === "add") {
              return { ...item, quantity: item.quantity + 1 };
            } else if (action === "reduce") {
              return { ...item, quantity: Math.max(item.quantity - 1, 0) };
            }
          }
          return item;
        })
        .filter((item) => item.quantity > 0);

      dispatch(setCartLocalStorage(updatedCart));
      setCart(updatedCart);
    } else if (action === "add" && quantity) {
      const newCart = [...cartLocalStorage, { product: cart, quantity }];
      dispatch(setCartLocalStorage(newCart));
      setCart(newCart);
    }
  }

  if (!cartLocalStorage) return;
  return (
    <div className="container grid items-start justify-start w-full h-screen grid-cols-1 gap-2 mt-20 md:grid-cols-5">
      <div className="flex flex-col items-start justify-start w-full h-full col-span-1 gap-5 border-r border-neutral-300 md:col-span-4">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">
          Shopping Cart
        </h1>
        <table className="w-full table-auto">
          <thead className="border-b border-b-neutral-300">
            <tr>
              <th className="text-left">Item</th>
              <th className="text-left">Quantity</th>
              <th className="text-left">Price</th>
            </tr>
          </thead>
          {/* <tbody>
            {cartLocalStorage.map((item, index) => (
              <tr key={index} className="border-b border-b-neutral-200">
                <td>
                  <div className="flex items-center gap-3">
                    <Image
                      width={50}
                      height={50}
                      alt={item.product.name}
                      src={item.product.imageUrl}
                      className="w-[50px] h-[50px] object-cover"
                    />
                    <h3 className="whitespace-nowrap">{item.product.name}</h3>
                  </div>
                </td>
                <td>
                  <div className="flex items-center justify-start gap-2">
                    <Button
                      type="button"
                      onClick={() => handleQuantityCart(item.product, "reduce")}
                    >
                      -
                    </Button>
                    <p>{item.quantity}</p>
                    <Button
                      type="button"
                      onClick={() => handleQuantityCart(item.product, "add")}
                    >
                      +
                    </Button>
                  </div>
                </td>
                <td>
                  {formatCurrencyVN(Number(item.product.price) * item.quantity)}
                </td>
              </tr>
            ))}
          </tbody> */}
          <tbody>
            {cartLocalStorage.map((item, index) => (
              <tr key={index} className="border-b border-b-neutral-200">
                <td>
                  <div className="flex items-center gap-3">
                    <Image
                      width={200}
                      height={200}
                      alt={item.product.name}
                      src={item.product.imageUrl}
                      className="w-[200px] h-[200px] object-cover"
                    />
                    <h3 className="whitespace-nowrap">{item.product.name}</h3>
                  </div>
                </td>
                <td>
                  {/* Sử dụng vòng lặp for để tạo select từ 1 tới 9 */}
                  <select
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityCart(
                        item.product,
                        "add",
                        parseInt(e.target.value)
                      )
                    }
                    className="border border-gray-300 p-4 px-6"
                  >
                    {Array.from({ length: 9 }, (_, i) => i + 1).map(
                      (number) => (
                        <option key={number} value={number}>
                          {number}
                        </option>
                      )
                    )}
                  </select>
                </td>
                <td>
                  {formatCurrencyVN(Number(item.product.price) * item.quantity)}
                </td>
                <button
                  type="button"
                  className="bg-transparent text-black  p-2 font-bold text-xl "
                  onClick={() => handleRemoveProduct(item.product)}
                >
                  X
                </button>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="w-full h-full col-span-1">
        <Card>
          <CardTitle className="p-4">
            Subtotal:{" "}
            {formatCurrencyVN(
              cartLocalStorage.reduce(
                (total, item) =>
                  total + Number(item.product.price) * item.quantity,
                0
              )
            )}
          </CardTitle>
          <Separator className="w-full" />
          <CardContent className="flex flex-col items-center justify-start w-full gap-3 px-4 py-6">
            {cartLocalStorage.map((item, index) => {
              return (
                <div
                  key={index}
                  className="w-full flex justify-start items-start gap-3"
                >
                  <p>{item.product.name}:</p>
                  <p>{item.quantity}</p>
                </div>
              );
            })}
          </CardContent>
          <Separator className="w-full" />
          {cartLocalStorage.length > 0 && (
            <CardFooter className="p-4">
              <Dialog
                open={isCheckOut}
                onOpenChange={() => setIsCheckOut(!isCheckOut)}
              >
                <DialogTrigger asChild>
                  <Button type="button" className="w-full">
                    Checkout
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:min-w-[425px] flex justify-center items-center">
                  {isSignedIn ? (
                    <div className="w-full h-full flex flex-col justify-start items-start gap-3">
                      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">
                        Shipping Address
                      </h1>
                      <p>Please enter the address that you want to ship to</p>
                      <OrderForm
                        initialData={{
                          fullName: `${user.fullName ?? ""}`,
                          address: "",
                          city: "",
                          country: "",
                          postCode: "",
                          paymentMethod: "",
                          status: "PENDING",
                        }}
                      />
                    </div>
                  ) : (
                    <SignIn redirectUrl="/" routing="hash" />
                  )}
                </DialogContent>
              </Dialog>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Page;
