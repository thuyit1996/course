import { Modal } from "../modal"
import Button from "../button/Button";
interface ConfirmModalProps {
  isShowFooter?: boolean;
  buttonLabel?: [string, string],
  showButton?: [boolean, boolean],
  isOpen: boolean;
  closeModal: () => void;
  handleSave?: () => void;
  title: string,
  content: string;
}
const ConfirmModal = ({ isOpen, closeModal, handleSave, isShowFooter = true, buttonLabel, showButton, title, content }: ConfirmModalProps) => {
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
      <p className="text-base text-[#2c2c2c]" dangerouslySetInnerHTML={{__html: content}}>
      </p>
      {
        isShowFooter ? <div className={`flex items-center justify-end w-full gap-3 mt-6`}>
          <Button size="md" className={`${showButton?.[0] && 'hidden'}`} variant="outline" onClick={closeModal}>
            {buttonLabel?.[0] ?? 'Cancel'}
          </Button>
          <Button size="md" className={`${showButton?.[1] && 'hidden'}`} variant="secondary" onClick={handleSave}>
            {buttonLabel?.[1] ?? 'Save'}
          </Button>
        </div> : null
      }
    </Modal >
  )
}
export default ConfirmModal