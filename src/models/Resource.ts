export type ResourceCategory = "SERVICES" | "APPS" | "BRANDS" | "CONVINIENCES" | "CHANGE_OIL";

export interface ResourceProps {
  id: string;
  title: string;
  category: ResourceCategory;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export class ResourceModel {
  private props: ResourceProps;

  private constructor(props: ResourceProps) {
    this.props = props;
  }

  static create(data: {
    id: string;
    title: string;
    category: ResourceCategory;
    image?: string;
    createdAt: string;
    updatedAt: string;
  }): ResourceModel {
    return new ResourceModel({
      id: data.id,
      title: data.title,
      category: data.category,
      image: data.image,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }

  update(data: Partial<{
    title: string;
    category: ResourceCategory;
    image?: string;
  }>): ResourceModel {
    return new ResourceModel({
      id: this.id,
      title: data.title ?? this.title,
      category: data.category ?? this.category,
      image: data.image !== undefined ? data.image : this.image,
      createdAt: this.createdAt,
      updatedAt: new Date().toISOString(),
    });
  }

  get id() { return this.props.id; }
  get title() { return this.props.title; }
  get category() { return this.props.category; }
  get image() { return this.props.image; }
  get createdAt() { return this.props.createdAt; }
  get updatedAt() { return this.props.updatedAt; }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      category: this.category,
      image: this.image,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}