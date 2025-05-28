/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEventSourceWithAutoReconnect } from "@/hooks/useEventSource";
import { useModal } from "@/hooks/useModal";
import { InvokeTimmer, MiniTestCardItem } from "@/types/exam";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { toast } from 'react-toastify';
import ConfirmModal from "../ui/confirm-modal";
import CountDown from "./count-down";
import { QuestionGrid } from "./question/question-grid";

const Starting = ({ cards }: { cards: MiniTestCardItem[] }) => {
	const { isOpen, closeModal, openModal } = useModal();
	const { isOpen: isOpenWaiting, closeModal: closeModalWaiting, openModal: openModalWaiting } = useModal();
	const countDownRef = useRef<InvokeTimmer>(null);

	const [isStart, setIsStart] = useState(false);
	const [isFinish, setIsFinish] = useState(false);
	const session = useSession();

	const url = session ? `${process.env.NEXT_PUBLIC_API_ENDPOINT}/stream/scoreResult/${session.data?.user.userId}` : undefined;

	const { data, error } = useEventSourceWithAutoReconnect(url);

	useEffect(() => {
		if ((error as any)?.error) {
			closeModalWaiting();
			toast.error((error as any)?.error ?? '');
			countDownRef.current?.forceFinish();
			if ((error as any).userId && (error as any).examId) {
				console.log('error', error)
				// getHistoryData((error as any).examId, (error as any).userId);
			}
		}
	}, [error]);

	// useEffect(() => {
	// 	if (data?.examId === examId && data?.userId) {
	// 		getHistoryData(data.examId, data.userId);
	// 		countDownRef.current?.forceFinish();
	// 		closeModalWaiting();
	// 	}
	// }, [data]);

	const onStopExam = () => {
		setIsStart(false);
		onSubmitExam();

	}

	// const getHistoryData = async (examId: string, userId: string) => {
	// 	try {
	// 		const resp = await getHistoryDetail(examId, userId);
	// 		console.log(resp);
	// 		if (resp.responseData) {
	// 			setResponse(resp.responseData?.examResults?.[0])
	// 		}
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// }

	const onFinish = () => {
		setIsFinish(true);
		onSubmitExam();
	}


	const onSubmitExam = async () => {
		try {
			openModalWaiting();

			setTimeout(() => {
				countDownRef.current?.forceFinish();
				closeModalWaiting();
			}, 1500);
		} catch (error) {
			closeModalWaiting();
			countDownRef.current?.invokeCountDown();
			console.log(error);
			toast.error(`Something went wrong`);
		}
	}

	// const feedback = response ? parser(response?.remarks, {
	// 	replace(domNode) {
	// 		if (domNode.type === 'text') {
	// 			const text = domNode.data as string;
	// 			if (!text.includes('\n')) return;
	// 			const parts = text.split('\n');
	// 			return (
	// 				<>
	// 					{parts.map((part, index) => (
	// 						<React.Fragment key={index}>
	// 							{part}
	// 							{index < parts.length - 1 && <br />}
	// 						</React.Fragment>
	// 					))}
	// 				</>
	// 			);
	// 		}

	// 	},
	// }) : '';

	return (
		<>
			<div className="flex">
				<div className="max-h-[500px] lg:p-10 p-5 rounded-lg shadow text-center bg-white col-span-2 sticky top-[104px] w-[295px] mr-2" data-aos="fade-right">
					<div className="text-base font-semibold text-indigo-600 lg:mb-10 mb-8">TIMER</div>
					<CountDown
						duration={15}
						status="starting"
						submitExample={openModal}
						onUpdateStatus={setIsStart}
						ref={countDownRef}
						onStop={onStopExam}
						alertFinish={onFinish}
					/>
				</div>
				<QuestionGrid cards={cards} isFinish={isFinish} />
			</div>
			<ConfirmModal isOpen={isOpen} closeModal={() => {
				closeModal();
				countDownRef.current?.invokeCountDown();
			}} buttonLabel={['Cancel', 'Submit Now']} handleSave={() => {
				closeModal();
				onSubmitExam();
			}} title="Submit Confirmation" content="This action will submit your answers. You won’t be able to make changes afterward. Are you sure you want to continue?" />
			{/* Modal waiting  */}
			<ConfirmModal isOpen={isOpenWaiting} closeModal={closeModalWaiting} isShowFooter={false}
				title="Scoring in progress..."
				content="Please wait a moment while we process your results."
			/>
		</>
	)
}
export default Starting