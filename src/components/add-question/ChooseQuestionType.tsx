import CustomModal from "../ui/custom-modal";
import FillblankIcon from '@/public/images/icons/fillblank.svg';
import MultichoiceIcon from '@/public/images/icons/multichoice.svg';

const ChooseQuestionType = ({ isOpen, closeModal, chooseType }: {
    isOpen: boolean,
    closeModal: () => void;
    chooseType: (type: 0 | 1) => void;
}) => {
    return (
        <CustomModal
            isOpen={isOpen}
            closeModal={closeModal}
            title='Question type'
            isShowFooter={false}
            handleSave={console.log}
        >
            <div className="mt-6">
                <span className="text-base text-[#2c2c2c]">Do you want to create a Multiple Choice question or a Fill Blank question? Choose the format that best fits your goal.</span>
                <div className="mt-6 grid grid-cols-2 gap-6">
                    <div className="bg-indigo-50 py-15 flex cursor-pointer justify-center items-center text-indigo-600 text-lg rounded-lg text-semibold" onClick={() => chooseType(0)}>
                        <FillblankIcon className="mr-2" />
                        Fill Blank
                    </div>
                    <div className="bg-rose-100 py-15 flex cursor-pointer justify-center items-center text-rose-600 text-lg rounded-lg text-semibold" onClick={() => chooseType(1)}>
                        <MultichoiceIcon className="mr-2" />
                        Multiple Choice
                    </div>

                </div>
            </div>
        </CustomModal>
    )
}
export default ChooseQuestionType;