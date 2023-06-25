'use client';

import useLoginModal from "../../hooks/useLoginModal";
import Modal from "./Modal";

export default function LoginModal() {
  const loginModal = useLoginModal()

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <h1>Body</h1>
      <h1>Body</h1>
      <h1>Body</h1>
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