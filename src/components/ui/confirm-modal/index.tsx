import { useModal } from "@/hooks/useModal";
import { Modal } from "../modal"
import Button from "../button/Button";
interface ConfirmModalProps {
    isShowFooter?: boolean;
    closeModalProp : () => void;
    handeSaveProp:() => void
}
const ConfirmModal = ({ isShowFooter, closeModalProp, handeSaveProp}: ConfirmModalProps) => {
    const { isOpen, openModal, closeModal } = useModal();
    return (
        <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-[600px] p-5 lg:p-8"
      >
        <h4 className="font-semibold text-[#2c2c2c] mb-3 text-[24px] leading-8">
          Have you finished your writing?
        </h4>
        <p className="text-base text-[#2c2c2c]">
        Once you submit, you won’t be able to edit your response.<br/> Are you sure you want to submit?
        </p>
        {
isShowFooter ?        <div className="flex items-center justify-end w-full gap-3 mt-6">
          <Button size="md" variant="outline" onClick={closeModal}>
            Cancel
          </Button>
          <Button size="md" variant="secondary" onClick={handleSave}>
            Save Changes
          </Button>
        </div> : null
        }

      </Modal>
    )
}
export default ConfirmModal