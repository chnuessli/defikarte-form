import { useState } from 'react';
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import FormConfig from "../../configuration/fromconfig";
import SwitchForm from "../SwitchForm/SwitchForm";
import TextForm from "../TextForm/TextForm";
import './CreateForm.css';

const CreateForm = ({ state, setState }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { t } = useTranslation();
  const [positionError, setPositionError] = useState(null);

  const onSubmit = (formValues) => {
    if (state.latitude == null || state.longitude == null) {
      setPositionError(t('error_pos'))
    } else {
      setPositionError(null);
      setState({ ...state, ...formValues, isValid: true });
    }
  }

  const renderFormComponent = () => {
    return FormConfig.map((formComp, index) => {
      if (formComp.type === 'Text') {
        return <TextForm
          name={formComp.name}
          handle={register(formComp.name, { ...formComp.rules })}
          errors={errors}
          errorMsg={t(formComp.errorMsg)}
          defaultValue={formComp.defaultValue}
          key={index}
          label={t(formComp.label)}
          placeholder={t(formComp.placeholder)}
        />
      }
      else if (formComp.type === 'Switch') {
        return <SwitchForm
          name={formComp.name}
          handle={register(formComp.name, { ...formComp.rules })}
          errors={errors}
          errorMsg={t(formComp.errorMsg)}
          defaultValue={formComp.defaultValue}
          key={index}
          label={t(formComp.label)}
        />
      }
      else {
        return null;
      }
    })
  }

  const position = state.longitude != null && state.latitude != null ? `${state.latitude?.toFixed(4)}, ${state.longitude?.toFixed(4)}` : 'n/a';
  return (
    <>
      <div className="mb-3 form-inline">
        <p htmlFor='position'>{t('position')}</p>
        <p id='position' className={positionError != null ? 'border-bottom  border-danger' : 'border-bottom'}>{position}</p>
        {positionError !== null ? <p className="error">{positionError}</p> : null}
      </div>
      <Form onSubmit={handleSubmit((data) => onSubmit(data))} className='form-inline'>
        {renderFormComponent()}
        <Button variant="success" type="submit" value='submit' >{t('submit')}</Button>
      </Form>
    </>
  );
}

export default CreateForm;