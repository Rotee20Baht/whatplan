'use client';

import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { toast } from 'react-toastify';
import { FcGoogle } from 'react-icons/fc'
import { FaFacebook } from 'react-icons/fa'

import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import Button from "../Button";

export default function LoginModal() {
  const [ isLoading, setIsLoading ] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
  })

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal])

  const onSubmit = (data) => {
    setIsLoading(true)
    console.log(data)
    const functionThatReturnPromise = () => new Promise(resolve => setTimeout(resolve, 3000));
    toast.promise(
        functionThatReturnPromise,
        {
          pending: 'Promise is pending',
          success: 'Promise resolved 👌',
          error: 'Promise rejected 🤯'
        }
    )
    setIsLoading(false)
  }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading 
        title="ยินดีต้อนรับกลับสู่ Whatplan"
        subtitle="กรุณาเข้าสู่ระบบบัญชีของคุณ"
      />
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input 
          id="email"
          label="อีเมลล์"
          autoComplete="email"
          disabled={isLoading}
          register={register}  
          errors={errors}
          required
        />
        <Input
          id="password"
          label="รหัสผ่าน"
          type="password"
          autoComplete="current-password"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Button 
          label="เข้าสู่ระบบ"
        />
      </form>
    </div>
  );
  
  const footerContent = (
    <div className="flex flex-col gap-4">
      <h1 className="text-center">หรือเข้าสู่ระบบด้วย</h1>
      <Button 
        label="Google"
        onClick={() => toast.success("Lorem ipsum dolor")}
        icon={FcGoogle}
        outline
      />
      <Button 
        label="Facebook"
        onClick={() => toast.success("Lorem ipsum dolor")}
        outline
        icon={FaFacebook}
        iColor="text-blue-500"
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <p>ยังไม่มีบัญชี?&nbsp;
          <span
            onClick={onToggle}
            className="text-neutral-800 cursor-pointer hover:underline"
            >สมัครสมาชิกที่นี่
          </span>
        </p>
      </div>
    </div>
  )

  return (
    <Modal
      title="เข้าสู่ระบบ"
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      body={bodyContent}
      footer={footerContent}
    />
  )
}