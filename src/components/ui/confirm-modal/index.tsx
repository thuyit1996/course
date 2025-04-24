import { useModal } from "@/hooks/useModal";
import { Modal } from "../modal"

const ConfirmModal = () => {
    const { isOpen, openModal, closeModal } = useModal();
    return (
        <Modal
            isOpen={isOpen}
            onClose={closeModal}
            className="max-w-[600px] p-5 lg:p-8"
        >
            <h4 className="font-semibold text-gray-800 mb-7 text-title-sm dark:text-white/90">
                Modal Heading
            </h4>
            <p className="text-sm leading-6 text-gray-500 dark:text-gray-400">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque euismod est quis mauris lacinia pharetra. Sed a ligula
                ac odio condimentum aliquet a nec nulla. Aliquam bibendum ex sit
                amet ipsum rutrum feugiat ultrices enim quam.
            </p>
            <p className="mt-5 text-sm leading-6 text-gray-500 dark:text-gray-400">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque euismod est quis mauris lacinia pharetra. Sed a ligula
                ac odio.
            </p>
            <div className="flex items-center justify-end w-full gap-3 mt-8">
                {/* <Button size="sm" variant="outline" onClick={closeModal}>
                    Close
                </Button>
                <Button size="sm" onClick={handleSave}>
                    Save Changes
                </Button> */}
            </div>
        </Modal>
    )
}
export default ConfirmModal