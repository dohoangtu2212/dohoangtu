import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";

type Props = {
  title: string;
  message: string;
  isOpen: boolean;
  cancelRef: React.MutableRefObject<any>;
  onClose: () => void;
  onConfirm?: () => void;
};

function AlertConfirm({
  title,
  message,
  isOpen,
  cancelRef,
  onClose,
  onConfirm,
}: Props) {
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {title}
          </AlertDialogHeader>
          <AlertDialogBody>{message}</AlertDialogBody>
          <AlertDialogFooter>
            <Button
              ref={cancelRef}
              onClick={onClose}
              minWidth={"80px"}
              variant="outline"
            >
              Huỷ
            </Button>
            <Button
              onClick={() => {
                onConfirm && onConfirm();
                onClose();
              }}
              minWidth={"80px"}
              ml={3}
            >
              Đồng ý
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

export default AlertConfirm;
