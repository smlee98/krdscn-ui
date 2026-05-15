"use client";

import * as React from "react";
import {
  ModalRoot,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalClose,
  Button
} from "@/components/ui/krds";

export default function ModalWithForm() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");

  return (
    <ModalRoot>
      <ModalTrigger asChild>
        <Button variant="primary">정보 수정</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalClose />
        <ModalHeader title="개인정보 수정" />
        <ModalBody>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="modal-name" className="text-krds-gray-90 text-sm font-medium">
                이름
              </label>
              <input
                id="modal-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="홍길동"
                className="border-krds-gray-30 focus:border-krds-primary-50 rounded-md border px-3 py-2 text-sm focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="modal-email" className="text-krds-gray-90 text-sm font-medium">
                이메일
              </label>
              <input
                id="modal-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="hong@korea.go.kr"
                className="border-krds-gray-30 focus:border-krds-primary-50 rounded-md border px-3 py-2 text-sm focus:outline-none"
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <ModalClose asChild>
            <Button variant="secondary">취소</Button>
          </ModalClose>
          <Button variant="primary">저장</Button>
        </ModalFooter>
      </ModalContent>
    </ModalRoot>
  );
}
