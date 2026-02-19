import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type TemplateType = 'minimal' | 'modern' | 'creative';

interface TemplatesState {
  selectedTemplate: TemplateType;
  customColors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

const initialState: TemplatesState = {
  selectedTemplate: 'modern',
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
    setCustomColors(state, action: PayloadAction<{ primary: string; secondary: string; accent: string }>) {
      state.customColors = action.payload;
    },
  },
});

export const { setSelectedTemplate, setCustomColors } = templatesSlice.actions;
export default templatesSlice.reducer;
