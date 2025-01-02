import { Entity } from "@/core/entities/entity";

export interface AttachmentProps {
  title: string,
  url: string,
}


export abstract class Attachment<T extends AttachmentProps> extends Entity<T> {
    get title() {
        return this.props.title;
    }

    get url() {
        return this.props.url;
    }

}