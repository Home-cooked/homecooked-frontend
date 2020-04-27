import React, {useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import parse from 'autosuggest-highlight/parse';
import usePlacesApi from '../hooks/places-api';


const autocompleteService = { current: null };

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
}));

export default ({onSelect = () => {}}) => {
  const classes = useStyles();
  const [input, setInput] = useState('');
  const [options, setOptions] = useState([]);
  const placesService = usePlacesApi();
  useEffect(() => {
    let preempted = false;

    const req = () => {
      if(!placesService){ return ''; }
      placesService.getPlacePredictions(({input, types: ['address']}), results => setOptions(results));
    };

    if (input === '') {
      setOptions([]);
      return undefined;
    }

    req();
    
    return () => {
      preempted = true;
    };
  }, [input, placesService]);

  return (
    <Autocomplete
      style={{ width: 300 }}
      getOptionLabel={(option) => (typeof option === 'string' ? option : option.description)}
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      renderInput={(params) => (
        <TextField
          {...params}
          label="Location"
          required
          variant="outlined"
          fullWidth
          onChange={({target:{value}}) => setInput(value)}
        />
      )}
      renderOption={(option) => {
        const matches = option.structured_formatting.main_text_matched_substrings;
        const parts = parse(
          option.structured_formatting.main_text,
          matches.map(({offset, length}) => [offset, offset + length]),
        );
        // TODO: Need a way to handle keyboard enter as well as click
        return (
          <Grid container alignItems="center" onClick={() => onSelect(option)}>
            <Grid item>
              <LocationOnIcon className={classes.icon} />
            </Grid>
            <Grid item xs>
              {parts.map((part, index) => (
                <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                  {part.text}
                </span>
              ))}

              <Typography variant="body2" color="textSecondary">
                {option.structured_formatting.secondary_text}
              </Typography>
            </Grid>
          </Grid>
        );
      }}
    />
  );
}
