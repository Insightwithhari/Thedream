export enum Author {
  USER = 'user',
  AI = 'ai',
}

export interface TextContent {
  type: 'text';
  text: string;
}

export interface VisualizationAction {
    action: 'setStyle' | 'addHBonds' | 'zoomTo' | 'addLabel';
    selection: Record<string, any>;
    selection2?: Record<string, any>;
    style?: Record<string, any>;
    label?: string;
}

export interface PdbVisualizationContent {
  type: 'pdb_visualization';
  pdbId: string;
  actions?: VisualizationAction[];
}

export interface DownloaderContent {
  type: 'downloader';
  pdbContent: string;
  filename: string;
}

export interface Article {
  title: string;
  summary: string;
}
export interface ArticleListContent {
  type: 'article_list';
  articles: Article[];
}

export interface DrugTarget {
    name: string;
    function: string;
    rationale: string;
}

export interface DrugTargetListContent {
    type: 'drug_target_list';
    targets: DrugTarget[];
    pathogen: string;
}


export type MessageContent = TextContent | PdbVisualizationContent | DownloaderContent | ArticleListContent | DrugTargetListContent;

export interface ChatMessage {
  id: string;
  author: Author;
  content: MessageContent[];
  rawText?: string;
}
