import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type TemplateType = 'minimal' | 'modern' | 'creative';
export type ModelType = 'model1' | 'model2' | 'model3' | 'model4' | 'model5' | 'model6' | 'model7' | 'model8' | 'model9';

interface TemplatesState {
  selectedTemplate: TemplateType;
  selectedModel: ModelType | null;
  customColors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

const initialState: TemplatesState = {
  selectedTemplate: 'modern',
  selectedModel: null,
  customColors: {
    primary: '#3B82F6',
    secondary: '#1F2937',
    accent: '#10B981',
  },
};

const templatesSlice = createSlice({
  name: 'templates',
  initialState,
  reducers: {
    setSelectedTemplate(state, action: PayloadAction<TemplateType>) {
      state.selectedTemplate = action.payload;
    },
    setSelectedModel(state, action: PayloadAction<ModelType>) {
      state.selectedModel = action.payload;
    },
    setCustomColors(state, action: PayloadAction<{ primary: string; secondary: string; accent: string }>) {
      state.customColors = action.payload;
    },
  },
});

export const { setSelectedTemplate, setSelectedModel, setCustomColors } = templatesSlice.actions;
export default templatesSlice.reducer;
