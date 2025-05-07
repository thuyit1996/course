import CustomModal from "../ui/custom-modal";

const ChooseQuestionType = ({isOpen, closeModal}: {
    isOpen: boolean,
    closeModal:() => void;
}) => { 
    return (
        <CustomModal
        isOpen={isOpen}
        closeModal={closeModal}
        title='Create question'
        isShowFooter={false}
        handleSave={console.log}
    >
        <div></div>
    </CustomModal>
    )
}
export default ChooseQuestionType;