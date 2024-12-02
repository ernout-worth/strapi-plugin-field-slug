import React, { useState, useEffect } from "react";
import {
  unstable_useContentManagerContext as useContentManagerContext
} from '@strapi/strapi/admin';

import {
  Field,
  Flex
} from "@strapi/design-system";
import { ArrowClockwise, StrikeThrough } from "@strapi/icons";
import styled from "styled-components";

import cyrToLat from "./cyr-to-lat";

const Index = ({ name, value, intlLabel, attribute }) => {
  const dateObj = new Date();
  let year = dateObj.getFullYear();
  let month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
  let day = ("0" + dateObj.getDate()).slice(-2);
  let hours = ("0" + dateObj.getHours()).slice(-2);
  let minutes = ("0" + dateObj.getMinutes()).slice(-2);
  let seconds = ("0" + dateObj.getSeconds()).slice(-2);

  let data_date;
  let datetime = `${year}-${month}-${day}-${hours}-${minutes}-${seconds}`;

  attribute.options?.kw ? attribute.options?.kw : 'post';
  attribute.options?.pattern ? attribute.options?.pattern : 'datetime';

  attribute.options?.kw
    ? (data_date = slugify(attribute.options?.kw) + "-" + datetime)
    : (data_date = datetime);

  // console.log("data_date", data_date);

  const generateSlug_by_Datetime = () => {
    onChange({ target: { name, value: data_date } });
  };


  const { form } = useContentManagerContext();
  // Here 'initialData' and 'values' correspond to 'initialValues' and 'values'.
  const { initialValues, values, onChange } = form;
  //const debouncedTargetFieldValue = useDebounce(values.title, 300);

  let data_id;
  let data_title;


  // const reg = /^[A-Za-z0-9-_.~[\]/]*$/;

  function slugify(str) {
    str = str.toLowerCase();
    return cyrToLat(str)
      .replace(/[^a-zA-Z0-9]/g, ' ')
      .trim()
      .replaceAll(/\s\s+/g, " ")
      .replaceAll(" ", "-");
  }

  // useEffect(() => {
  //   if (Number(values.id)) {
  //     attribute.options?.kw
  //       ? setDataId(slugify(attribute.options?.kw) + "-" + values.id)
  //       : setDataId(values.id);
  //   }
  // }, [values.updatedAt, values.id]);

  if (Number(values.id)) {
    attribute.options?.kw
      ? (data_id = slugify(attribute.options?.kw) + "-" + values.id)
      : (data_id = values.id);
  }

  // console.log("data_id", data_id);

  const generateSlug_by_Id = () => {
    onChange({ target: { name, value: data_id } });
  };

  if (values.title) {
    attribute.options?.kw
      ? (data_title = slugify(attribute.options?.kw + "-" + values.title))
      : (data_title = slugify(values.title));
  }
  console.log("data_title", data_title);
  const generateSlug_by_Title = async () => {

    onChange({ target: { name, value: data_title, type: "text" } });
  };


  if (value == undefined) {
    generateSlug_by_Datetime();
  }
  if (attribute.options?.pattern == "title") {
    useEffect(() => {
      if (values.title) {
        generateSlug_by_Title();
      }
    }, [values.title]);
  } else if (attribute.options?.pattern == "id") {
    useEffect(() => {
      if (values.id) {
        generateSlug_by_Id();
      }
    }, [values.id]);
  }

  const clearGeneratedSlug = () => {
    onChange({ target: { name, value: "" } });
    // console.log("values", values);
    // console.log("attr: ", attribute);
  };

  return (
    <Flex spacing={1}>
      <Field.Label>{intlLabel?.defaultMessage}</Field.Label>

      <Field.Input
        label="slug"
        name="slug"
        value={value || ""}
        //     onChange={(e) => {
        //       if (e.target.value.match(/^[A-Za-z0-9-_.~[\]/]*$/)) {
        //         onChange({ target: { name, value: e.target.value } });
        //       }
        // }}
        onChange={(e) =>
          onChange({
            target: { name, value: slugify(e.target.value) },
          })
        }
        endAction={
          <Flex horizontal spacing={2}>
            <FieldActionWrapper
              onClick={() => generateSlug_by_Title()}
              label="regenerate"
            >
              <StrikeThrough />
            </FieldActionWrapper>
            <FieldActionWrapper onClick={() => generateSlug_by_Datetime()}>
              <ArrowClockwise />
            </FieldActionWrapper>
          </Flex>
        }
      />
    </Flex>
  );
};

export default Index;

export const FieldActionWrapper = styled(Field.Action)`
  svg {
    height: 1rem;
    width: 1rem;
    path {
      fill: ${({ theme }) => theme.colors.neutral400};
    }
  }
  svg:hover {
    path {
      fill: ${({ theme }) => theme.colors.primary600};
    }
  }
`;
