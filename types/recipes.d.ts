type RecipeType = {
  category: string;
  content: string;
  description: string;
  difficult: string;
  id: string;
  image: string;
  ingredients: string[];
  slug: string;
  title: string;
  time: string;
  userId: string;
  writer: string;
  ratings: ReviewType[];
  createdAt: string;
};

type ReviewType = {
  rating: number;
  comment: string;
  userId: string;
};

type LinkType = {
  title: string;
  url: string;
};

type CourseDataType = {
  _id: string | any;
  title: string;
  description: string;
  videoUrl: string;
  videoThumbnail: object;
  videoSection: string;
  videoLength: number;
  videoPlayer: string;
  links: LinkType[];
  suggestion: string;
  questions: CommentType[];
};

type BenefitType = {
  title: string;
};

type PrerequisiteType = {
  title: string;
};

type CoursesType = {
  _id: any;
  name: string;
  description: string;
  categories: string;
  price: number;
  estimatedPrice?: number;
  thumbnail: {
    public_id: string | any;
    url: string | any;
  };
  tags: string;
  level: string;
  demoUrl: string;
  benefits: BenefitType[];
  prerequisites: PrerequisiteType[];
  reviews: ReviewType[];
  courseData: CourseDataType[];
  ratings?: number;
  purchased: number;
};
