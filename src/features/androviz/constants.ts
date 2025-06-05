
import type { AndroidComponentDefinition, ScreenDefinition } from './types';
import { Type, Image as ImageIcon, BoxSelect, Maximize, Columns, RectangleHorizontal, Rows, CheckSquare, SlidersHorizontal, RadioTower, ToggleLeft, Server, CreditCard, Smartphone, Tablet, Watch, FoldVertical, Settings, DraftingCompass } from 'lucide-react';

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
    icon: Type, // Can use a more specific icon if available, reusing Type for now
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
    id: 'radiobutton',
    name: 'RadioButton',
    icon: RadioTower, // Re-using for individual radio button for clarity
    defaultXmlSnippet: `<RadioButton
    android:id="@+id/new_radiobutton"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="Radio Option"/>`,
    defaultProperties: {
      'android:id': '@+id/new_radiobutton',
      'android:layout_width': 'wrap_content',
      'android:layout_height': 'wrap_content',
      'android:text': 'Radio Option',
    },
  },
  {
    id: 'radiogroup',
    name: 'RadioGroup',
    icon: Rows, // Using Rows icon as a stand-in for a group of items
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
    id: 'switch_widget', // Renamed from 'switch' to avoid conflict with React Switch component if used directly
    name: 'Switch',
    icon: ToggleLeft,
    defaultXmlSnippet: `<Switch
    android:id="@+id/new_switch_widget"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="Switch Label" />`,
    defaultProperties: {
      'android:id': '@+id/new_switch_widget',
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
    id: 'progressbar',
    name: 'ProgressBar',
    icon: Server, // Using Server icon as a stand-in for ProgressBar
    defaultXmlSnippet: `<ProgressBar
    android:id="@+id/new_progressbar"
    style="?android:attr/progressBarStyleHorizontal"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:max="100"
    android:progress="50" />`,
    defaultProperties: {
      'android:id': '@+id/new_progressbar',
      'style': '?android:attr/progressBarStyleHorizontal',
      'android:layout_width': 'match_parent',
      'android:layout_height': 'wrap_content',
      'android:max': '100',
      'android:progress': '50',
    },
  },
  {
    id: 'scrollview',
    name: 'ScrollView',
    icon: FoldVertical, // Using FoldVertical for ScrollView
    defaultXmlSnippet: `<ScrollView
    android:id="@+id/new_scrollview"
    android:layout_width="match_parent"
    android:layout_height="match_parent">
    \n    <!-- Add one child view here, typically a LinearLayout -->
    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="vertical">\n
        <!-- Content goes here -->\n
    </LinearLayout>\n
</ScrollView>`,
    defaultProperties: {
      'android:id': '@+id/new_scrollview',
      'android:layout_width': 'match_parent',
      'android:layout_height': 'match_parent',
    },
  },
  {
    id: 'cardview',
    name: 'CardView (Basic)',
    icon: CreditCard, // Using CreditCard for CardView
    defaultXmlSnippet: `<androidx.cardview.widget.CardView
    xmlns:card_view="http://schemas.android.com/apk/res-auto"
    android:id="@+id/new_cardview"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    card_view:cardCornerRadius="4dp"
    card_view:cardElevation="4dp"
    card_view:cardUseCompatPadding="true">
    \n    <!-- Add child views here -->
    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Content in Card"
        android:padding="16dp"/>\n
</androidx.cardview.widget.CardView>`,
    defaultProperties: {
      'android:id': '@+id/new_cardview',
      'android:layout_width': 'match_parent',
      'android:layout_height': 'wrap_content',
      'card_view:cardCornerRadius': '4dp',
      'card_view:cardElevation': '4dp',
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
    icon: Rows,
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
    icon: Maximize,
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


export const SCREEN_PREVIEWS: ScreenDefinition[] = [
  { id: 'default', name: 'Default (Resizable)', icon: Smartphone, width_val: '100%', height_val: '100%' },
  { id: 'custom', name: 'Custom Dimensions', icon: Settings, width_val: '360px', height_val: '640px', isCustom: true },
  // Phones
  { id: 'pixel_5', name: 'Pixel 5', icon: Smartphone, width_val: '393px', height_val: '851px' },
  { id: 'pixel_7_pro', name: 'Pixel 7 Pro', icon: Smartphone, width_val: '412px', height_val: '892px' },
  { id: 'galaxy_s20_ultra', name: 'Galaxy S20 Ultra', icon: Smartphone, width_val: '412px', height_val: '915px' },
  { id: 'iphone_12_pro', name: 'iPhone 12 Pro (Illustrative)', icon: Smartphone, width_val: '390px', height_val: '844px' },
  { id: 'small_phone_legacy', name: 'Small Phone (Legacy)', icon: Smartphone, width_val: '320px', height_val: '568px' },
  // Foldables
  { id: 'surface_duo', name: 'Surface Duo (Folded)', icon: FoldVertical, width_val: '540px', height_val: '720px' },
  { id: 'galaxy_fold', name: 'Galaxy Fold (Folded)', icon: FoldVertical, width_val: '280px', height_val: '653px' },
  // Tablets
  { id: 'ipad_mini', name: 'iPad Mini (Illustrative)', icon: Tablet, width_val: '768px', height_val: '1024px' },
  { id: 'pixel_tablet', name: 'Pixel Tablet', icon: Tablet, width_val: '1024px', height_val: '640px' }, // Usually landscape
  { id: 'nexus_10', name: 'Nexus 10', icon: Tablet, width_val: '1280px', height_val: '800px'},
  // Wear OS / Smartwatches
  { id: 'wear_os_small_round', name: 'Wear OS Small Round', icon: Watch, width_val: '384px', height_val: '384px' }, // e.g. 1.2" at 320 PPI
  { id: 'wear_os_large_round', name: 'Wear OS Large Round', icon: Watch, width_val: '454px', height_val: '454px' }, // e.g. 1.4" at 324 PPI
  { id: 'wear_os_square', name: 'Wear OS Square', icon: Watch, width_val: '320px', height_val: '320px' }, // Older square devices
  { id: 'wear_os_rect', name: 'Wear OS Rectangular', icon: Watch, width_val: '320px', height_val: '360px'}, // Some rectangular watches
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
