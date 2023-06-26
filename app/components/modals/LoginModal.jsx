'use client';

import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import useLoginModal from "@/app/hooks/useLoginModal";
import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";

export default function LoginModal() {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
  })
  const loginModal = useLoginModal()

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading 
        title="ยินดีต้อนรับกลับสู่ Whatplan"
        subtitle="กรุณาเข้าสู่ระบบบัญชีของคุณ"
      />
      <Input 
        id="email"
        label="อีเมลล์"
        disabled={isLoading}
        register={register}  
        errors={errors}
        required
      />
      <Input
        id="password"
        label="รหัสผ่าน"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  return (
    <Modal
      title="เข้าสู่ระบบ"
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      body={bodyContent}
    />
  )
}