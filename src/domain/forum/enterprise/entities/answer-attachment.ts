import { UniqueEntityId } from "@/core/entities/value-objects/unique-entity-id";
import { Attachment, AttachmentProps } from "./attachment";

interface AnswerAttachmentProps extends AttachmentProps {
  answerId: UniqueEntityId;
  attachmentId: UniqueEntityId;
}


export class AnswerAttachment extends Attachment<AnswerAttachmentProps> {

    get answerId() {
        return this.props.answerId;
    }

    get attachmentId() {
        return this.props.attachmentId;
    }

    static create(props: AnswerAttachmentProps, id?: UniqueEntityId) {
        return new AnswerAttachment(props, id);
    }
}