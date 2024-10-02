export class TopicModel {
  data!: Topic[];
  message?: string;
  status?: string;
}

export class Topic {
  id?: string;
  topicName?: string;
  topicUnit?: string;
  topicDescription?: string;
  topicDetails!: TopicDetail[];
}

export class TopicDetail {
  vocab!: string;
  meaning!: string;
  wordType!: string;
}

export class MatchingGame {
  id?: number;
  title!: string;
  wordType!: string;
  isCheck = false;
}
