import { Image, StyleSheet, Text, View, TextInput } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { FormGenerator, FormProvider, FormUiProvider, SchemaVariant, useField, useForm } from 'form-trial';

export const FuiFieldText: React.FC<any> = ({ schema, wrapper: Wrapper, schemas }) => {
  const { ref, formState, state, onChange, getProp } = useField({ schema });
  const hidden = getProp('hidden');
  if (hidden) return <></>;

  const style = getProp('style');
  const placeholder = getProp('placeholder');
  const title = getProp('title');
  const subtitle = getProp('subtitle');
  const optional = getProp('optional');
  const format = getProp('format');
  const mask = getProp('mask');
  const hint = getProp('hint');
  const tooltip = getProp('tooltip');
  const disabled = getProp('disabled');
  const suffix = getProp('suffix');
  const prefix = getProp('prefix');
  const touched = getProp('touched');
  const { isSubmitted, isForceSubmitted } = formState;
  const hasTouched = (isSubmitted && !isForceSubmitted) || touched || state.touched;
  const error = hasTouched && state.error;

  console.log('value changed', state.value)
  return (
    <Wrapper schema={schema} schemas={schemas} style={style}>
      <TextInput
        placeholder={placeholder}
        value={state.value}
        onChangeText={(value) => {
          console.log('onchange coming', value)
          onChange(value)
        }}
      />
    </Wrapper>
  )
}


const components: any = {
  [SchemaVariant.FIELD]: {
    ['TEXT']: FuiFieldText
  },
  [SchemaVariant.VIEW]: {},
  [SchemaVariant.FIELD_ARRAY]: {},
  [SchemaVariant.FIELD_OBJECT]: {},
  [SchemaVariant.GROUP]: {},
};
const schemas: any = [
  {
    "variant": "FIELD",
    "component": "TEXT",
    "config": {
      "name": "text",
      "defaultValue": ""
    },
    "properties": {
      "placeholder": {
        "value": "Placeholder",
      },
      "title": {
        "value": "Title"
      },
      "style": {
        "value": {
          "lg": 12,
          "md": 12,
          "sm": 12
        }
      }
    },
    "rules": [],
    "id": "mXxQnyBkd7"
  }
];
const initialValues = {};
const extraData = {}

export const BasicExample = () => {
  const actions = useForm({
    schemas,
    initialValues,
    extraData
  })

  return (
    <FormProvider value={actions}>
      <FormUiProvider value={{ components }}>
        <FormGenerator
          wrapper={({ children }: any) => <View>{children}</View>}
          error={() => <Text>Sample Error</Text>}
        />
      </FormUiProvider>
    </FormProvider>
  )
}

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome xxxx!</ThemedText>
        <HelloWave />
      </ThemedView>
      <View>
        <BasicExample />
      </View>
      <Text>Bottom</Text>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
