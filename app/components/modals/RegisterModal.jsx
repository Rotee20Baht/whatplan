'use client';

import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

import useLoginModal from "@/app/hooks/useLoginModal";
import { toast } from 'react-toastify';
import { FcGoogle } from 'react-icons/fc'
import { FaFacebook } from 'react-icons/fa'

import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import Button from "../Button";
import useRegisterModal from "@/app/hooks/useRegisterModal";

export default function RegisterModal() {
  const [ isLoading, setIsLoading ] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
      name: ''
    },
  })
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const onToggle = useCallback(() => {
    registerModal.onClose();;
    loginModal.onOpen();
  },[loginModal, registerModal])

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
        title="ยินดีต้อนรับเข้าสู่ Whatplan"
        subtitle="กรุณากรอกข้อมูลให้ถูกต้องเพื่อสมัครสมาชิก"
      />
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input 
          id="name"
          label="ชื่อผู้ใช้งาน"
          disabled={isLoading}
          register={register}  
          errors={errors}
          autoComplete="new-username"
          required
        />
        <Input 
          id="email"
          label="อีเมลล์"
          disabled={isLoading}
          register={register}  
          errors={errors}
          autoComplete="email"
          required
        />
        <Input
          id="password"
          label="รหัสผ่าน"
          type="password"
          disabled={isLoading}
          register={register}
          errors={errors}
          autoComplete="new-password"
          required
        />
        <Button 
          label="สมัครสมาชิก"
        />
      </form>
    </div>
  );
  
  const footerContent = (
    <div className="flex flex-col gap-4">
      <h2 className="text-center">หรือดำเนินการด้วย</h2>
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
        <p>มีบัญชีอยู่แล้ว?&nbsp;
          <span
            onClick={onToggle}
            className="text-neutral-800 cursor-pointer hover:underline"
            >เข้าสู่ระบบที่่นี่
          </span>
        </p>
      </div>
    </div>
  )

  return (
    <Modal
      title="สมัครสมาชิก"
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      body={bodyContent}
      footer={footerContent}
    />
  )
}