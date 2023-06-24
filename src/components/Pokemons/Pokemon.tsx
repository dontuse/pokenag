import { Card, CardContent, Typography, Box, Skeleton, Fade } from "@mui/material";
import { memo } from "react";
import useSWR from "swr";

const fetcher = (path: string) => fetch(path).then((res) => res.json());

type Props = {
  name?: string;
  url?: string;
  height?: number;
  weight?: number;
  isLoading?: boolean;
};

type Res = {
  name: string;
  weight: string;
  height: string;
};

function Pokemon(props: Props) {
  const { data, isLoading } = useSWR<Res>(() => props.url, fetcher, {
    keepPreviousData: true,
  });
  const loading = props.isLoading || isLoading;
  const weight = data?.weight || props.height;
  const height = data?.height || props.height;

  return (
    <Card>
      <CardContent>
        <Box sx={{ height: 90 }}>
          {loading ? (
            <>
              <Skeleton sx={{ mb: 2 }} animation="wave" />
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
            </>
          ) : (
            <Fade timeout={400} in={!loading}>
              <Box>
                <Typography sx={{ mb: 2 }} variant="body1">
                  {props.name}
                </Typography>
                <Typography variant="body1">
                  <b>Вес:</b> {weight} ед
                </Typography>
                <Typography variant="body1">
                  <b>Рост:</b> {height} ед
                </Typography>
              </Box>
            </Fade>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}

export default memo(Pokemon);
