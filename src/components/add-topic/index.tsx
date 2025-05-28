import { createTopic } from "@/api/admin/fetches";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import Input from "../form/input/InputField";
import CustomModal from "../ui/custom-modal";
import { Topic } from "@/types/admin";

type Props = { isOpen: boolean; closeModal: () => void; onSuccess?: (topic: Topic) => void; }

const AddTopic = ({ isOpen, closeModal, onSuccess }: Props) => {

    const [name, setName] = useState('');

    const onCreateTopic = async () => {
        try {
            const body = {
                name,
            }
            const resp = await createTopic(body);
            if (resp?.responseData) {
                toast.success("Create exam successfully!");
                setName('');
                onSuccess?.(resp?.responseData);
            } else {
                toast.error("Something went wrong")
            }
            closeModal();
        } catch (error) {
            toast.error("Something went wrong")
        }
    }

    return (
        <CustomModal
            isOpen={isOpen}
            closeModal={closeModal}
            title='Create topic'
            buttonLabel={['Cancel', 'Create']}
            handleSave={onCreateTopic}
            showLeftButton={false}
        >
            <div className="flex flex-col overflow-y-auto custom-scrollbar max-h-[450px]">
                <div className="mt-6">
                    <label className="mb-2 block text-base text-[#2c2c2c]">
                        Topic
                    </label>
                    <Input placeholder={'Example: "Travel English", "Daily Conversations”'} wrapperClass='w-full' value={name} onChange={(event) => setName(event.target.value)} />
                </div>
            </div>
        </CustomModal>
    )
}
export default AddTopic; 