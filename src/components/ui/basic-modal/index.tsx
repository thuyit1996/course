import { Modal } from "../modal"
import Button from "../button/Button";
import { ReactNode } from "react";
import SpinnerIcon from '@/public/images/icons/spinner.svg';
interface ConfirmModalProps {
    isShowFooter?: boolean;
    buttonLabel?: [string, string],
    showButton?: [boolean, boolean],
    isOpen: boolean;
    closeModal: () => void;
    handleSave?: () => void;
    title: string,
    children: ReactNode,
    isLoading?: boolean
}
const BasicModal = ({ isOpen, closeModal, handleSave, isShowFooter = true, buttonLabel, showButton, title, children, isLoading = false }: ConfirmModalProps) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={closeModal}
            className="max-w-[600px] p-5 lg:p-8"
        >
            <h4 className="font-semibold text-[#2c2c2c] mb-3 text-[24px] leading-8">
                {title}
            </h4>
            {children}
            {
                isShowFooter ? <div className="mt-6 flex items-center">
                    <div className={`flex items-center justify-end w-full gap-3`}>
                        <Button size="md" className={`${showButton?.[0] && 'hidden'}`} variant="outline" onClick={closeModal}>
                            {buttonLabel?.[0] ?? 'Cancel'}
                        </Button>
                        <Button size="md" className={`${showButton?.[1] && 'hidden'}`} variant="secondary" onClick={handleSave} startIcon={isLoading ? <SpinnerIcon /> : <></>}>
                            {buttonLabel?.[1] ?? 'Save'}
                        </Button>
                    </div>
                </div> : null
            }
        </Modal >
    )
}
export default BasicModal;