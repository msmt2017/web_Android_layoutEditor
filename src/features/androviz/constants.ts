import type { AndroidComponentDefinition } from './types';
import { Type, Image as ImageIcon, BoxSelect, Maximize, Columns, RectangleHorizontal } from 'lucide-react'; // Using BoxSelect for Layouts, Maximize for ConstraintLayout, Columns for LinearLayout

export const ANDROID_COMPONENTS: AndroidComponentDefinition[] = [
  {
    id: 'textview',
    name: 'TextView',
    icon: Type,
    defaultXmlSnippet: `<TextView
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="New TextView" />`,
    defaultProperties: {
      'android:layout_width': 'wrap_content',
      'android:layout_height': 'wrap_content',
      'android:text': 'New TextView',
      'android:textSize': '16sp',
    },
  },
  {
    id: 'button',
    name: 'Button',
    icon: RectangleHorizontal, // Changed from Button
    defaultXmlSnippet: `<Button
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="New Button" />`,
    defaultProperties: {
      'android:layout_width': 'wrap_content',
      'android:layout_height': 'wrap_content',
      'android:text': 'New Button',
    },
  },
  {
    id: 'edittext',
    name: 'EditText',
    icon: Type, // Could use a more specific icon if available or custom SVG
    defaultXmlSnippet: `<EditText
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:hint="Enter text" />`,
    defaultProperties: {
      'android:layout_width': 'match_parent',
      'android:layout_height': 'wrap_content',
      'android:hint': 'Enter text',
    },
  },
  {
    id: 'imageview',
    name: 'ImageView',
    icon: ImageIcon,
    defaultXmlSnippet: `<ImageView
    android:layout_width="100dp"
    android:layout_height="100dp"
    android:src="@drawable/ic_placeholder" />`, // Assuming a placeholder drawable
    defaultProperties: {
      'android:layout_width': '100dp',
      'android:layout_height': '100dp',
      'android:src': '@drawable/ic_placeholder',
      'android:contentDescription': 'Image',
    },
  },
  {
    id: 'linearlayout',
    name: 'LinearLayout (Vertical)',
    icon: Columns,
    defaultXmlSnippet: `<LinearLayout
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:orientation="vertical">
    \n</LinearLayout>`,
    defaultProperties: {
      'android:layout_width': 'match_parent',
      'android:layout_height': 'wrap_content',
      'android:orientation': 'vertical',
    },
  },
  {
    id: 'relativelayout',
    name: 'RelativeLayout',
    icon: BoxSelect,
    defaultXmlSnippet: `<RelativeLayout
    android:layout_width="match_parent"
    android:layout_height="match_parent">
    \n</RelativeLayout>`,
    defaultProperties: {
      'android:layout_width': 'match_parent',
      'android:layout_height': 'match_parent',
    },
  },
  {
    id: 'constraintlayout',
    name: 'ConstraintLayout',
    icon: Maximize, // Representing constraints
    defaultXmlSnippet: `<androidx.constraintlayout.widget.ConstraintLayout
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent">
    \n</androidx.constraintlayout.widget.ConstraintLayout>`,
    defaultProperties: {
      'android:layout_width': 'match_parent',
      'android:layout_height': 'match_parent',
    },
  },
];

export const SCREEN_PREVIEWS = [
  { id: 'default', name: 'Default (Resizable)', width: '100%', height: '100%' },
  { id: 'pixel_7', name: 'Pixel 7 (1080x2400)', width: '360px', height: '800px' }, // Approx dp values
  { id: 'pixel_tablet', name: 'Pixel Tablet (2560x1600)', width: '1024px', height: '640px' }, // Approx dp values
  { id: 'small_phone', name: 'Small Phone (720x1280)', width: '320px', height: '570px' },
];

export const INITIAL_XML_CODE = `<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/main_layout"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <TextView
        android:id="@+id/welcome_text"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Welcome to AndroViz!"
        android:textSize="24sp"
        android:layout_centerHorizontal="true"
        android:layout_marginTop="50dp"/>

    <Button
        android:id="@+id/action_button"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Get Started"
        android:layout_below="@id/welcome_text"
        android:layout_centerHorizontal="true"
        android:layout_marginTop="20dp"/>

    <ImageView
        android:id="@+id/placeholder_image"
        android:layout_width="150dp"
        android:layout_height="150dp"
        android:src="@drawable/placeholder_icon"
        android:layout_below="@id/action_button"
        android:layout_centerHorizontal="true"
        android:layout_marginTop="30dp"
        android:contentDescription="Placeholder Image"/>

</RelativeLayout>
`;
