import Image from "next/image"

export const RenderAudioQ = ({ audioSrc }: { audioSrc: string }) => {
  return (
    <audio controls className="w-full">
      <source src={audioSrc} type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  )
}

export const RenderImageQ = ({ imageSrc, index }: { imageSrc: string, index?: string }) => {
  return (
    <Image
      src={imageSrc}
      alt={`Question ${index}`}
      width={400}
      height={250}
      className="rounded"
    />
  )
}


export const RenderTextQ = ({ questionText }: { questionText: string }) => {
  return (
    <p className="text-gray-800 text-base leading-relaxed">{questionText}</p>
  )
}

export const RenderQuestion = ({ audioSrc, imageSrc, index, questionText }: { audioSrc?: string, imageSrc?: string, index?: string, questionText?: string }) => {

  return <>
    {audioSrc && <RenderAudioQ audioSrc={audioSrc} />}
    {imageSrc && <RenderImageQ imageSrc={imageSrc} index={index} />}
    {questionText && <RenderTextQ questionText={questionText} />}
  </>
}