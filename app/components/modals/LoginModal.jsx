'use client';

import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams  } from "next/navigation";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { toast } from "react-hot-toast";
import { FcGoogle } from 'react-icons/fc'

import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import Button from "../Button";

export default function LoginModal() {

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const [ isLoading, setIsLoading ] = useState(false);
  const router = useRouter()
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
    setIsLoading(true);

    signIn('credentials', { 
      ...data, 
      redirect: false,
      callbackUrl: callbackUrl
    })
    .then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success('เข้าสู่ระบบสำเร็จ!');
        router.refresh();
        loginModal.onClose();
      }
      
      if (callback?.error) {
        toast.error(callback.error);
      }
    });
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
          type="email"
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
          onClick={() => {}}
        />
      </form>
    </div>
  );
  
  const footerContent = (
    <div className="flex flex-col gap-4">
      <h1 className="text-center">หรือเข้าสู่ระบบด้วย</h1>
      <Button 
        label="Google"
        onClick={() => {
          signIn('google', { callbackUrl: callbackUrl })
          .catch(() => toast.error("เข้าสู่ระบบล้มเหลว"))
        }}
        icon={FcGoogle}
        outline
      />
      <div className="text-neutral-500 text-center font-light">
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