import { IUploadVideoResponse } from "@/types/dyntube";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  ModalProps,
  Button,
  Text,
  Flex,
  Box,
} from "@chakra-ui/react";
import { FC, useCallback, useState, useRef, useEffect } from "react";
import { useUploadVideoMutation } from "@/store/apis/dyntubeUpload";
import FileInput from "@/components/Input/FileInput";
import Video from "@/components/DynTube/Video";

type VideoUploadModalProps = Omit<ModalProps, "children"> & {
  onUploaded: (uploadedVideo: IUploadVideoResponse) => void;
  onDurationChange: (duration: number) => void;
};
const VideoUploadModal: FC<VideoUploadModalProps> = ({
  onUploaded,
  onDurationChange,
  ...modalProps
}) => {
  const { onClose } = modalProps;
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploadedVideo, setUploadedVideo] =
    useState<IUploadVideoResponse | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [
    uploadVideo,
    { isLoading: isUploadVideoLoading, data: uploadVideoData },
  ] = useUploadVideoMutation();

  const handleVideoSelected = useCallback(
    (video: File) => {
      if (!!previewUrl) URL.revokeObjectURL(previewUrl);

      if (!video) return;
      setSelectedVideo(video);
      const objectUrl = URL.createObjectURL(video);
      setPreviewUrl(objectUrl);
      videoRef.current?.load();
    },
    [previewUrl]
  );

  const handleSave = useCallback(() => {
    if (!uploadedVideo) return;
    // TODO: Delete old video
    const duration = videoRef.current?.duration ?? 0;
    onUploaded?.(uploadedVideo);
    onDurationChange?.(duration);
    onClose();
  }, [uploadedVideo, onUploaded, onClose, videoRef, onDurationChange]);

  const handleUploadVideo = useCallback(async () => {
    if (!selectedVideo) return;
    try {
      await uploadVideo({ video: selectedVideo as File });
    } catch (err) {}
  }, [uploadVideo, selectedVideo]);

  useEffect(() => {
    if (!!uploadVideoData) {
      setUploadedVideo(uploadVideoData);
    }
  }, [uploadVideoData]);

  return (
    <Modal {...modalProps}>
      <ModalOverlay />
      <ModalContent pt="1rem">
        <ModalCloseButton />
        <ModalBody
          as={Flex}
          flexDir="column"
          gap="0.5rem"
          alignItems="flex-start"
        >
          {!uploadedVideo && (
            <FileInput
              name={!!previewUrl ? "Chọn lại video" : "Chọn video"}
              accept="video/*"
              onFileSelected={handleVideoSelected}
            />
          )}
          {previewUrl && (
            <>
              <Box py="1rem" w="100%" hidden={!!uploadedVideo}>
                <video controls ref={videoRef}>
                  <source src={previewUrl} />
                </video>
              </Box>

              <Flex pt="1rem" flexDir="column" gap="0.25rem">
                {!!uploadedVideo && (
                  <Text>Bạn có muốn đăng tải video này?</Text>
                )}
                {!!uploadedVideo ? (
                  <>
                    <Text textAlign="center" color="green.400" fontWeight="600">
                      Đăng tải thành công
                    </Text>
                    <Video dynTubeKey={uploadedVideo.channelKey} w="100%" />
                    <Text fontSize="0.85rem">
                      {
                        'Video đã được lưu vào hệ thống đang được xử lý. Bạn có thể "Lưu".'
                      }
                    </Text>
                  </>
                ) : (
                  <Button
                    onClick={handleUploadVideo}
                    isLoading={isUploadVideoLoading}
                  >
                    Đăng tải
                  </Button>
                )}
              </Flex>
            </>
          )}
        </ModalBody>

        <ModalFooter>
          <Button isDisabled={!uploadedVideo} onClick={handleSave}>
            Lưu
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default VideoUploadModal;
