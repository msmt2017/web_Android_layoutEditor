
import type { AndroidComponentDefinition } from './types';
import { Type, Image as ImageIcon, BoxSelect, Maximize, Columns, RectangleHorizontal, Rows, CheckSquare, SlidersHorizontal, RadioTower, ToggleLeft } from 'lucide-react'; // Using BoxSelect for Layouts, Maximize for ConstraintLayout, Columns for LinearLayout

export const ANDROID_COMPONENTS: AndroidComponentDefinition[] = [
  {
    id: 'textview',
    name: 'TextView',
    icon: Type,
    defaultXmlSnippet: `<TextView
    android:id="@+id/new_textview"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="New TextView" />`,
    defaultProperties: {
      'android:id': '@+id/new_textview',
      'android:layout_width': 'wrap_content',
      'android:layout_height': 'wrap_content',
      'android:text': 'New TextView',
      'android:textSize': '16sp',
    },
  },
  {
    id: 'button',
    name: 'Button',
    icon: RectangleHorizontal,
    defaultXmlSnippet: `<Button
    android:id="@+id/new_button"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="New Button" />`,
    defaultProperties: {
      'android:id': '@+id/new_button',
      'android:layout_width': 'wrap_content',
      'android:layout_height': 'wrap_content',
      'android:text': 'New Button',
    },
  },
  {
    id: 'edittext',
    name: 'EditText',
    icon: Type, // Consider a specific icon like 'FormInput' if added
    defaultXmlSnippet: `<EditText
    android:id="@+id/new_edittext"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:hint="Enter text" />`,
    defaultProperties: {
      'android:id': '@+id/new_edittext',
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
    android:id="@+id/new_imageview"
    android:layout_width="100dp"
    android:layout_height="100dp"
    android:src="@drawable/ic_placeholder"
    android:contentDescription="Image Description" />`,
    defaultProperties: {
      'android:id': '@+id/new_imageview',
      'android:layout_width': '100dp',
      'android:layout_height': '100dp',
      'android:src': '@drawable/ic_placeholder',
      'android:contentDescription': 'Image Description',
    },
  },
  {
    id: 'checkbox',
    name: 'CheckBox',
    icon: CheckSquare,
    defaultXmlSnippet: `<CheckBox
    android:id="@+id/new_checkbox"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="Checkbox" />`,
    defaultProperties: {
      'android:id': '@+id/new_checkbox',
      'android:layout_width': 'wrap_content',
      'android:layout_height': 'wrap_content',
      'android:text': 'Checkbox',
      'android:checked': 'false',
    },
  },
  {
    id: 'radiogroup',
    name: 'RadioGroup',
    icon: Rows, // Changed from List
    defaultXmlSnippet: `<RadioGroup
    android:id="@+id/new_radiogroup"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:orientation="vertical">
    <RadioButton
        android:id="@+id/radio_option_1"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Option 1"/>
    <RadioButton
        android:id="@+id/radio_option_2"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Option 2"/>
</RadioGroup>`,
    defaultProperties: {
      'android:id': '@+id/new_radiogroup',
      'android:layout_width': 'wrap_content',
      'android:layout_height': 'wrap_content',
      'android:orientation': 'vertical',
    },
  },
  {
    id: 'switch',
    name: 'Switch',
    icon: ToggleLeft,
    defaultXmlSnippet: `<Switch
    android:id="@+id/new_switch"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="Switch Label" />`,
    defaultProperties: {
      'android:id': '@+id/new_switch',
      'android:layout_width': 'wrap_content',
      'android:layout_height': 'wrap_content',
      'android:text': 'Switch Label',
      'android:checked': 'false',
    },
  },
  {
    id: 'seekbar',
    name: 'SeekBar',
    icon: SlidersHorizontal,
    defaultXmlSnippet: `<SeekBar
    android:id="@+id/new_seekbar"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:max="100" />`,
    defaultProperties: {
      'android:id': '@+id/new_seekbar',
      'android:layout_width': 'match_parent',
      'android:layout_height': 'wrap_content',
      'android:max': '100',
      'android:progress': '50',
    },
  },
  {
    id: 'linearlayout_vertical',
    name: 'LinearLayout (Vertical)',
    icon: Columns,
    defaultXmlSnippet: `<LinearLayout
    android:id="@+id/new_linearlayout_vertical"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:orientation="vertical">
    \n</LinearLayout>`,
    defaultProperties: {
      'android:id': '@+id/new_linearlayout_vertical',
      'android:layout_width': 'match_parent',
      'android:layout_height': 'wrap_content',
      'android:orientation': 'vertical',
    },
  },
  {
    id: 'linearlayout_horizontal',
    name: 'LinearLayout (Horizontal)',
    icon: Rows, // Re-using for horizontal row-like structure
    defaultXmlSnippet: `<LinearLayout
    android:id="@+id/new_linearlayout_horizontal"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:orientation="horizontal">
    \n</LinearLayout>`,
    defaultProperties: {
      'android:id': '@+id/new_linearlayout_horizontal',
      'android:layout_width': 'match_parent',
      'android:layout_height': 'wrap_content',
      'android:orientation': 'horizontal',
    },
  },
  {
    id: 'relativelayout',
    name: 'RelativeLayout',
    icon: BoxSelect,
    defaultXmlSnippet: `<RelativeLayout
    android:id="@+id/new_relativelayout"
    android:layout_width="match_parent"
    android:layout_height="match_parent">
    \n</RelativeLayout>`,
    defaultProperties: {
      'android:id': '@+id/new_relativelayout',
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
    android:id="@+id/new_constraintlayout"
    android:layout_width="match_parent"
    android:layout_height="match_parent">
    \n</androidx.constraintlayout.widget.ConstraintLayout>`,
    defaultProperties: {
      'android:id': '@+id/new_constraintlayout',
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
        android:textColor="#FF6A5ACD" 
        android:padding="16dp"
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
