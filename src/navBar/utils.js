import Traec from "traec";

export const getTerm = (term, props) => {
  let { tenant_meta } = props;
  let term_map = (tenant_meta || Traec.Im.Map()).get("term_map") || Traec.Im.Map();
  return term_map.get(term) || term;
};
