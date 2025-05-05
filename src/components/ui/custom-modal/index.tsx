import { Modal } from "../modal"
import Button from "../button/Button";
import { ReactNode } from "react";
import PlusIcon from '@/public/images/icons/plus.svg';
interface ConfirmModalProps {
  isShowFooter?: boolean;
  buttonLabel?: [string, string],
  showButton?: [boolean, boolean],
  isOpen: boolean;
  closeModal: () => void;
  handleSave?: () => void;
  title: string,
  children: ReactNode,
  addQuestion?:() => void;
  showAddQuestion?: boolean;
}
const CustomModal = ({ isOpen, closeModal, handleSave, isShowFooter = true, buttonLabel, showButton, title, children, addQuestion, showAddQuestion }: ConfirmModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      className="max-w-[600px] p-5 lg:p-8"
    >
      <h4 className="font-semibold text-[#2c2c2c] mb-3 text-[24px] leading-8">
        {title}
        {/* Have you finished your writing? */}
      </h4>
      {children}
      {
        isShowFooter ? <div className="mt-6 flex items-center">
          {
            showAddQuestion ? 

          <Button variant='primary' className="w-[300px]" startIcon={<PlusIcon className="fill-rose-600" />} onClick={addQuestion}>Add Child Question</Button>
           : null
          }
          <div className={`flex items-center justify-end w-full gap-3`}>
            <Button size="md" className={`${showButton?.[0] && 'hidden'}`} variant="outline" onClick={closeModal}>
              {buttonLabel?.[0] ?? 'Cancel'}
            </Button>
            <Button size="md" className={`${showButton?.[1] && 'hidden'}`} variant="secondary" onClick={handleSave}>
              {buttonLabel?.[1] ?? 'Save'}
            </Button>
          </div>
        </div> : null
      }
    </Modal >
  )
}
export default CustomModal